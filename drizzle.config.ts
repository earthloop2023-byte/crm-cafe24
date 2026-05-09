import { defineConfig } from "drizzle-kit";
import { resolveDatabaseUrl } from "./server/database-url";

const databaseUrl =
  resolveDatabaseUrl() ||
  "postgres://placeholder:placeholder@localhost:5432/placeholder";

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
