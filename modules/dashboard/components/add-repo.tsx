"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Loader2 } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createPlayground } from "../actions";

const AddRepo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [repoUrl, setRepoUrl] = useState("");
  const [title, setTitle] = useState("");
  const [template, setTemplate] = useState<
    "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR"
  >("REACT");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl) {
      toast.error("Please enter a GitHub repository URL");
      return;
    }

    setIsLoading(true);
    try {
      // Derive title from repo name if empty
      const cleanUrl = repoUrl.replace(/\/$/, "");
      const repoName = cleanUrl.split("/").pop() || "GitHub Project";
      const projectTitle = title.trim() || repoName;

      const playground = await createPlayground({
        title: projectTitle,
        description: `Imported from ${repoUrl}`,
        template,
      });

      if (!playground) {
        throw new Error("Failed to create playground");
      }

      toast.success("Repository project initialized successfully!");
      setIsOpen(false);
      setRepoUrl("");
      setTitle("");
      router.push(`/playground/${playground.id}`);
    } catch (error) {
      console.error("Error importing repository:", error);
      toast.error("Failed to import repository");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={handleOpen}
        className="group px-6 py-6 flex flex-row justify-between items-center border rounded-lg bg-muted cursor-pointer 
        transition-all duration-300 ease-in-out
        hover:bg-background hover:border-[#E93F3F] hover:scale-[1.02]
        shadow-[0_2px_10px_rgba(0,0,0,0.08)]
        hover:shadow-[0_10px_30px_rgba(233,63,63,0.15)]"
      >
        <div className="flex flex-row justify-center items-start gap-4">
          <Button
            variant={"outline"}
            className="flex justify-center items-center bg-white group-hover:bg-[#fff8f8] group-hover:border-[#E93F3F] group-hover:text-[#E93F3F] transition-colors duration-300"
            size={"icon"}
          >
            <ArrowDown
              size={30}
              className="transition-transform duration-300 group-hover:translate-y-1"
            />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-[#e93f3f]">
              Open Github Repository
            </h1>
            <p className="text-sm text-muted-foreground max-w-[220px]">
              Work with your repositories in our editor
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <Image
            src={"/github.svg"}
            alt="Open GitHub repository"
            width={150}
            height={150}
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                <span>Open GitHub Repository</span>
              </DialogTitle>
              <DialogDescription>
                Import a GitHub repository URL to create a playground environment.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="repoUrl">Repository URL</Label>
                <Input
                  id="repoUrl"
                  placeholder="https://github.com/username/repository"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="title">Project Name (Optional)</Label>
                <Input
                  id="title"
                  placeholder="My GitHub Project"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="template">Project Stack Template</Label>
                <Select
                  value={template}
                  onValueChange={(val: any) => setTemplate(val)}
                >
                  <SelectTrigger id="template">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="REACT">React (TypeScript)</SelectItem>
                    <SelectItem value="NEXTJS">Next.js</SelectItem>
                    <SelectItem value="EXPRESS">Express.js</SelectItem>
                    <SelectItem value="VUE">Vue.js</SelectItem>
                    <SelectItem value="HONO">Hono (Node.js)</SelectItem>
                    <SelectItem value="ANGULAR">Angular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Import & Open
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddRepo;
