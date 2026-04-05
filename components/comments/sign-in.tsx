"use client";

import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { GitHubIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";

const SignIn = ({ callbackPath }: { callbackPath?: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);

    try {
      await signIn.social({
        provider: "github",
        callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}${callbackPath ? callbackPath : "/"}`,
      });
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error("There was a problem signing in.");
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleSignIn} disabled={isLoading} size="lg" variant="outline">
      {isLoading ? <Loader2Icon className="animate-spin" /> : <GitHubIcon />}
      Sign in with GitHub
    </Button>
  );
};

export { SignIn };
