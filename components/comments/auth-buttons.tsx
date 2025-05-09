"use client";

import { env } from "@/lib/env";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Button from "@/components/ui/button";
import { GitHubIcon } from "@/components/icons";
import { createClient } from "@/lib/supabase/client";

const AuthButtons = ({ slug }: { slug?: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleSignIn = async () => {
    setIsLoading(true);

    try {
      await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${env.NEXT_PUBLIC_BASE_URL}/auth/callback${slug ? `?next=/${slug}#comments` : ""}`,
        },
      });
    } catch (error) {
      console.error("Error signing in:", error);
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleSignIn} disabled={isLoading} size="lg">
      {isLoading ? <Loader2 className="animate-spin" /> : <GitHubIcon />}
      Sign in with GitHub
    </Button>
  );
};

export default AuthButtons;
