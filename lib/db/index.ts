import { attachDatabasePool } from "@vercel/functions";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { authRelations, relations } from "./schema";

// Create explicit pool instance for better connection management
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Attach to Vercel's pool management to ensure idle connections are properly
// released before fluid compute functions suspend:
// https://vercel.com/guides/connection-pooling-with-functions
try {
  attachDatabasePool(pool);
} catch {
  // ignore
}

export const db = drizzle({
  client: pool,
  // Main `defineRelations` first, then `defineRelationsPart`s.
  // https://orm.drizzle.team/docs/relations-v2#relations-parts
  relations: { ...relations, ...authRelations },
});
