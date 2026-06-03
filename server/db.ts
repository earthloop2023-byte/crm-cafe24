import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

function readEnv(name: string): string {
  return String(process.env[name] || "").trim();
}

function firstEnv(names: string[]): string {
  for (const name of names) {
    const value = readEnv(name);
    if (value) return value;
  }
  return "";
}

function resolveDatabaseUrl(): string {
  const explicitUrl = firstEnv([
    "DATABASE_URL",
    "POSTGRES_URL",
    "POSTGRESQL_URL",
    "PGDATABASE_URL",
    "DATABASE_PRIVATE_URL",
  ]);
  if (explicitUrl) return explicitUrl;

  const host = firstEnv(["DB_HOST", "PGHOST", "POSTGRES_HOST", "POSTGRESQL_HOST"]);
  const database = firstEnv(["DB_NAME", "DB_DATABASE", "POSTGRES_DB", "POSTGRES_DATABASE", "PGDATABASE"]);
  const user = firstEnv(["DB_USER", "DB_USERNAME", "POSTGRES_USER", "POSTGRES_USERNAME", "PGUSER"]);
  const password = firstEnv(["DB_PASSWORD", "POSTGRES_PASSWORD", "PGPASSWORD"]);
  const port = firstEnv(["DB_PORT", "PGPORT", "POSTGRES_PORT", "POSTGRESQL_PORT"]) || "5432";

  if (!host || !database || !user) return "";

  const auth = password ? `${encodeURIComponent(user)}:${encodeURIComponent(password)}` : encodeURIComponent(user);
  return `postgres://${auth}@${host}:${encodeURIComponent(port)}/${encodeURIComponent(database)}`;
}

const databaseUrl = resolveDatabaseUrl();

if (!databaseUrl) {
  throw new Error("Database connection is not configured. Set DATABASE_URL or DB_HOST/DB_PORT/DB_NAME/DB_USER/DB_PASSWORD.");
}

export const pool = new Pool({
  connectionString: databaseUrl,
});

export const db = drizzle(pool, { schema });

export async function ensureDatabasePerformanceObjects() {
  const statements = [
    `CREATE EXTENSION IF NOT EXISTS pg_trgm`,
    `CREATE INDEX IF NOT EXISTS idx_contracts_contract_date ON contracts (contract_date DESC)`,
    `CREATE INDEX IF NOT EXISTS idx_contracts_manager_name ON contracts (manager_name)`,
    `CREATE INDEX IF NOT EXISTS idx_contracts_customer_name ON contracts (customer_name)`,
    `CREATE INDEX IF NOT EXISTS idx_contracts_payment_method ON contracts (payment_method)`,
    `CREATE INDEX IF NOT EXISTS idx_contracts_created_at ON contracts (created_at DESC)`,
    `CREATE INDEX IF NOT EXISTS idx_contracts_contract_number_trgm ON contracts USING gin (contract_number gin_trgm_ops)`,
    `CREATE INDEX IF NOT EXISTS idx_contracts_customer_name_trgm ON contracts USING gin (customer_name gin_trgm_ops)`,
    `CREATE INDEX IF NOT EXISTS idx_contracts_manager_name_trgm ON contracts USING gin (manager_name gin_trgm_ops)`,
    `CREATE INDEX IF NOT EXISTS idx_contracts_products_trgm ON contracts USING gin (products gin_trgm_ops)`,
    `CREATE INDEX IF NOT EXISTS idx_products_category ON products (category)`,
  ];

  for (const statement of statements) {
    try {
      await pool.query(statement);
    } catch (error) {
      console.warn("[db] performance object setup skipped for statement:", statement);
      console.warn(error);
    }
  }
}
