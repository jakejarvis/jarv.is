import { env } from "@/lib/env";
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/types/database";

let clientInstance: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function createClient() {
  if (clientInstance) return clientInstance;

  clientInstance = createBrowserClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL!, env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

  return clientInstance;
}
