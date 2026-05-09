import { defineConfig } from "drizzle-kit";
import { ensureDatabaseUrl } from "./server/database-url";

const databaseUrl = ensureDatabaseUrl();

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
