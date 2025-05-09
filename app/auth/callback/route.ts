import { env } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const GET = async (request: Request): Promise<NextResponse> => {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${env.NEXT_PUBLIC_BASE_URL}${next}`);
    }
  }

  // TODO: add login error page
  return NextResponse.redirect(`${env.NEXT_PUBLIC_BASE_URL}/auth/auth-code-error`);
};
