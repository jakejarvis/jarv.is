import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    // biome-ignore lint/style/noNonNullAssertion: runs outside Next.js; can't use env helper from @t3-oss/env-nextjs
    url: process.env.DATABASE_URL!,
  },
});
