import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, Terminal, Sparkles, Layers, Cpu, CheckCircle2, Copy } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Documentation - VibeCode Editor",
  description: "Complete documentation for VibeCode Editor: WebContainers, AI suggestions, and setup guide.",
};

export default function DocsPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" alt="VibeCode Logo" width={36} height={36} />
              <span className="font-extrabold text-lg tracking-tight">VibeCode Docs</span>
            </Link>
            <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700">
              v1.0
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="container mx-auto flex-1 px-4 sm:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Nav */}
          <aside className="md:col-span-1 space-y-4">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Getting Started
                </h3>
                <nav className="flex flex-col space-y-1">
                  <a
                    href="#overview"
                    className="text-sm font-medium hover:text-primary transition-colors py-1 px-2 rounded-md hover:bg-muted"
                  >
                    Overview
                  </a>
                  <a
                    href="#architecture"
                    className="text-sm font-medium hover:text-primary transition-colors py-1 px-2 rounded-md hover:bg-muted"
                  >
                    Architecture
                  </a>
                  <a
                    href="#shortcuts"
                    className="text-sm font-medium hover:text-primary transition-colors py-1 px-2 rounded-md hover:bg-muted"
                  >
                    Keyboard Shortcuts
                  </a>
                </nav>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Features & AI
                </h3>
                <nav className="flex flex-col space-y-1">
                  <a
                    href="#ai-suggestions"
                    className="text-sm font-medium hover:text-primary transition-colors py-1 px-2 rounded-md hover:bg-muted"
                  >
                    AI Code Completion (Ollama)
                  </a>
                  <a
                    href="#webcontainers"
                    className="text-sm font-medium hover:text-primary transition-colors py-1 px-2 rounded-md hover:bg-muted"
                  >
                    WebContainer Terminal
                  </a>
                  <a
                    href="#troubleshooting"
                    className="text-sm font-medium hover:text-primary transition-colors py-1 px-2 rounded-md hover:bg-muted"
                  >
                    Troubleshooting
                  </a>
                </nav>
              </div>
            </div>
          </aside>

          {/* Docs Content */}
          <main className="md:col-span-3 space-y-12 max-w-3xl">
            {/* Overview Section */}
            <section id="overview" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2 text-primary">
                <BookOpen className="h-6 w-6" />
                <h1 className="text-3xl font-extrabold tracking-tight">VibeCode Editor Documentation</h1>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed">
                VibeCode Editor is a next-generation browser-based Integrated Development Environment (IDE)
                powered by <strong>Next.js 15</strong>, <strong>Monaco Editor</strong>, <strong>WebContainers</strong>, and <strong>Local AI (Ollama)</strong>.
                It provides full-stack Node.js and React runtime execution directly inside the browser without needing a remote cloud sandbox.
              </p>
            </section>

            {/* Architecture Section */}
            <section id="architecture" className="space-y-4 scroll-mt-24 border-t pt-8">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-blue-500" />
                <h2 className="text-2xl font-bold">System Architecture</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border bg-card text-card-foreground">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Terminal className="h-4 w-4 text-emerald-500" />
                    WebContainers
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Runs Node.js inside the browser using WebAssembly and SharedArrayBuffer. Provides instant npm installs, dev servers, and live iframe previews.
                  </p>
                </div>
                <div className="p-4 rounded-xl border bg-card text-card-foreground">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    Ollama Local AI
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Zero-latency, private code completion and coding assistant using local open-source models like <code className="text-xs">qwen2.5-coder:0.5b</code> and <code className="text-xs">codellama</code>.
                  </p>
                </div>
              </div>
            </section>

            {/* Keyboard Shortcuts */}
            <section id="shortcuts" className="space-y-4 scroll-mt-24 border-t pt-8">
              <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-amber-500" />
                <h2 className="text-2xl font-bold">Keyboard Shortcuts</h2>
              </div>
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted text-muted-foreground text-xs uppercase">
                    <tr>
                      <th className="px-4 py-3">Shortcut</th>
                      <th className="px-4 py-3">Action</th>
                      <th className="px-4 py-3">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-3 font-mono font-bold text-xs"><kbd className="bg-muted px-2 py-1 rounded">Tab</kbd></td>
                      <td className="px-4 py-3 font-medium">Accept AI Suggestion</td>
                      <td className="px-4 py-3 text-muted-foreground">Applies inline AI ghost code into the editor</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono font-bold text-xs"><kbd className="bg-muted px-2 py-1 rounded">Esc</kbd></td>
                      <td className="px-4 py-3 font-medium">Reject Suggestion</td>
                      <td className="px-4 py-3 text-muted-foreground">Dismisses current ghost text suggestion</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono font-bold text-xs"><kbd className="bg-muted px-2 py-1 rounded">Ctrl</kbd> + <kbd className="bg-muted px-2 py-1 rounded">S</kbd></td>
                      <td className="px-4 py-3 font-medium">Save File</td>
                      <td className="px-4 py-3 text-muted-foreground">Saves active file and syncs with WebContainer</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono font-bold text-xs"><kbd className="bg-muted px-2 py-1 rounded">Ctrl</kbd> + <kbd className="bg-muted px-2 py-1 rounded">Space</kbd></td>
                      <td className="px-4 py-3 font-medium">Trigger AI Completion</td>
                      <td className="px-4 py-3 text-muted-foreground">Manually requests inline AI code suggestion</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* AI Setup */}
            <section id="ai-suggestions" className="space-y-4 scroll-mt-24 border-t pt-8">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                <h2 className="text-2xl font-bold">Ollama AI Configuration</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                VibeCode uses Ollama running locally on port <code className="text-xs bg-muted px-1.5 py-0.5 rounded">11434</code>. 
                For best performance and minimal RAM usage, we recommend <strong>qwen2.5-coder:0.5b</strong>.
              </p>
              <div className="bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs space-y-2">
                <p className="text-zinc-400"># Download recommended lightweight code model:</p>
                <div className="flex items-center justify-between">
                  <code>ollama pull qwen2.5-coder:0.5b</code>
                </div>
                <p className="text-zinc-400 pt-2"># Or download 7B CodeLlama model:</p>
                <div>
                  <code>ollama pull codellama</code>
                </div>
              </div>
            </section>

            {/* WebContainers */}
            <section id="webcontainers" className="space-y-4 scroll-mt-24 border-t pt-8">
              <div className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-emerald-500" />
                <h2 className="text-2xl font-bold">WebContainer Terminal</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The terminal in the preview panel runs directly inside your browser. You can execute standard commands:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <code>npm install &lt;package&gt;</code> — install third-party packages in real time
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <code>npm run dev</code> / <code>npm start</code> — start or restart dev server
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <code>ls</code>, <code>mkdir</code>, <code>cat</code> — standard UNIX shell commands
                </li>
              </ul>
            </section>

            {/* Troubleshooting */}
            <section id="troubleshooting" className="space-y-4 scroll-mt-24 border-t pt-8 pb-16">
              <h2 className="text-2xl font-bold">Troubleshooting</h2>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="border rounded-lg p-4 bg-muted/30">
                  <h4 className="font-semibold text-foreground mb-1">WebContainer doesn't boot or says SharedArrayBuffer missing?</h4>
                  <p className="text-xs">
                    WebContainers require Cross-Origin Isolation headers (<code className="text-xs">Cross-Origin-Opener-Policy: same-origin</code> and <code className="text-xs">Cross-Origin-Embedder-Policy: require-corp</code>), which are already configured in Next.js headers. Ensure you are accessing via <code className="text-xs">http://localhost:3000</code>.
                  </p>
                </div>
                <div className="border rounded-lg p-4 bg-muted/30">
                  <h4 className="font-semibold text-foreground mb-1">MongoDB connection error?</h4>
                  <p className="text-xs">
                    Prisma requires MongoDB configured with Replica Set (<code className="text-xs">rs0</code>). If using Docker, run <code className="text-xs">docker compose up -d</code>. If native, configure <code className="text-xs">replication.replSetName: rs0</code> in mongod.conf.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
