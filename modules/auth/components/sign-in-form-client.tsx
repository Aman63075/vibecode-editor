
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Chrome, Github, UserCheck, AlertTriangle } from "lucide-react";
import { signIn } from "@/auth";

async function handleGoogleSignIn() {
  "use server";
  if (!process.env.AUTH_GOOGLE_ID || !process.env.AUTH_GOOGLE_SECRET) {
    return;
  }
  await signIn("google", { redirectTo: "/dashboard" });
}

async function handleGithubSignIn() {
  "use server";
  if (!process.env.AUTH_GITHUB_ID || !process.env.AUTH_GITHUB_SECRET) {
    return;
  }
  await signIn("github", { redirectTo: "/dashboard" });
}

async function handleGuestSignIn() {
  "use server";
  await signIn("guest", { redirectTo: "/dashboard" });
}

const SignInFormClient = () => {
  const isGoogleConfigured = Boolean(
    process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
  );
  const isGithubConfigured = Boolean(
    process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET
  );

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Sign In
        </CardTitle>
        <CardDescription className="text-center">
          Choose your preferred sign-in method
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        {(!isGoogleConfigured || !isGithubConfigured) && (
          <div className="flex items-start gap-2 p-3 text-xs rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <span>
                OAuth credentials .env me configure nahi hain. Bina kisi setup ke turant chalaane ke liye neeche <strong>Continue as Guest</strong> par click karein.
              </span>
            </div>
          </div>
        )}

        <form action={handleGuestSignIn}>
          <Button type="submit" variant={"default"} size="lg" className="w-full font-semibold">
            <UserCheck className="mr-2 h-5 w-5" />
            <span>Continue as Guest (Instant Access)</span>
          </Button>
        </form>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or OAuth</span>
          </div>
        </div>

        <form action={handleGoogleSignIn}>
          <Button
            type="submit"
            variant={"outline"}
            className="w-full"
            disabled={!isGoogleConfigured}
            title={!isGoogleConfigured ? "Set AUTH_GOOGLE_ID in .env to enable" : undefined}
          >
            <Chrome className="mr-2 h-4 w-4" />
            <span>
              Sign in with Google {!isGoogleConfigured && "(Setup in .env needed)"}
            </span>
          </Button>
        </form>

        <form action={handleGithubSignIn}>
          <Button
            type="submit"
            variant={"outline"}
            className="w-full"
            disabled={!isGithubConfigured}
            title={!isGithubConfigured ? "Set AUTH_GITHUB_ID in .env to enable" : undefined}
          >
            <Github className="mr-2 h-4 w-4" />
            <span>
              Sign in with GitHub {!isGithubConfigured && "(Setup in .env needed)"}
            </span>
          </Button>
        </form>
      </CardContent>

      <CardFooter>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 w-full">
          By signing in, you agree to our{" "}
          <a href="#" className="underline hover:text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-primary">
            Privacy Policy
          </a>
          .
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignInFormClient;


