import { NextRequest, NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  message: string;
  history: ChatMessage[];
}

async function getActiveModel(ollamaHost: string, preferredModel?: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${ollamaHost}/api/tags`, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) return null;
    const data = await res.json();
    const models: string[] = (data.models || []).map(
      (m: { name?: string; model?: string }) => m.name || m.model || ""
    );

    if (preferredModel && models.some((m) => m === preferredModel || m.startsWith(preferredModel + ":"))) {
      return preferredModel;
    }

    const coderModel = models.find((m) => m.includes("coder") || m.includes("code"));
    if (coderModel) return coderModel;

    if (models.length > 0 && models[0]) return models[0];
    return null;
  } catch {
    return null;
  }
}

async function generateAIResponse(messages: ChatMessage[]): Promise<string> {
  const systemPrompt = `You are a helpful AI coding assistant. You help developers with:
- Code explanations and debugging
- Best practices and architecture advice  
- Writing clean, efficient code
- Troubleshooting errors
- Code reviews and optimizations

Always provide clear, practical answers. Use proper code formatting when showing examples.`;

  const fullMessages = [{ role: "system", content: systemPrompt }, ...messages];

  const prompt = fullMessages
    .map((msg) => `${msg.role}: ${msg.content}`)
    .join("\n\n");

  const ollamaHost = process.env.OLLAMA_HOST || "http://localhost:11434";
  const preferredModel = process.env.OLLAMA_MODEL || "codellama:latest";

  try {
    const activeModel = await getActiveModel(ollamaHost, preferredModel);
    if (!activeModel) {
      return "⚠️ **Local AI is not ready yet.**\n\nPlease ensure Ollama is installed and run this command in your terminal to download a model:\n```bash\nollama pull qwen2.5-coder:0.5b\n```\nOnce downloaded, you can chat with AI right here!";
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    const response = await fetch(`${ollamaHost}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: activeModel,
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.7,
          max_tokens: 1000,
          top_p: 0.9,
        },
      }),
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return `AI service returned error (${response.status}): ${response.statusText}`;
    }

    const data = await response.json();

    if (!data.response) {
      return data.error || "No response received from AI model.";
    }

    return data.response.trim();
  } catch (error) {
    console.warn("AI generation error:", (error as Error)?.message || error);
    return "I'm having trouble connecting to the local AI service. Please make sure Ollama is running (`ollama serve`).";
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();
    const { message, history = [] } = body;

    // Validate input
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 }
      );
    }

    // Validate history format
    const validHistory = Array.isArray(history)
      ? history.filter(
          (msg) =>
            msg &&
            typeof msg === "object" &&
            typeof msg.role === "string" &&
            typeof msg.content === "string" &&
            ["user", "assistant"].includes(msg.role)
        )
      : [];

    const recentHistory = validHistory.slice(-10);

    const messages: ChatMessage[] = [
      ...recentHistory,
      { role: "user", content: message },
    ];

    //   Generate ai response

    const aiResponse = await generateAIResponse(messages);



    return NextResponse.json({
      response: aiResponse,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chat API Error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        error: "Failed to generate AI response",
        details: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
