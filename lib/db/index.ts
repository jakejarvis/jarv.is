import { env } from "@/lib/env";
import * as schema from "@/lib/db/schema";
import { attachDatabasePool } from "@vercel/functions";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// Create explicit pool instance for better connection management
const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

// Attach to Vercel's pool management to ensure idle connections are properly
// released before fluid compute functions suspend:
// https://vercel.com/guides/connection-pooling-with-functions
try {
  attachDatabasePool(pool);
} catch {
  // ignore
}

// Pass pool to Drizzle with schema
export const db = drizzle(pool, { schema });
