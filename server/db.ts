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

async function tableExists(tableName: string): Promise<boolean> {
  const result = await pool.query<{ exists: boolean }>("select to_regclass($1) is not null as exists", [
    `public.${tableName}`,
  ]);
  return Boolean(result.rows[0]?.exists);
}

export async function ensureDatabasePerformanceObjects() {
  try {
    await pool.query(`CREATE EXTENSION IF NOT EXISTS pg_trgm`);
  } catch (error) {
    console.warn("[db] pg_trgm extension setup skipped.");
    console.warn(error);
  }

  const hasContracts = await tableExists("contracts");
  const hasProducts = await tableExists("products");

  if (!hasContracts && !hasProducts) {
    console.log("[db] performance indexes skipped because base tables are not ready yet.");
    return;
  }

  const statements = [
    ...(hasContracts
      ? [
          `CREATE INDEX IF NOT EXISTS idx_contracts_contract_date ON contracts (contract_date DESC)`,
          `CREATE INDEX IF NOT EXISTS idx_contracts_manager_name ON contracts (manager_name)`,
          `CREATE INDEX IF NOT EXISTS idx_contracts_customer_name ON contracts (customer_name)`,
          `CREATE INDEX IF NOT EXISTS idx_contracts_payment_method ON contracts (payment_method)`,
          `CREATE INDEX IF NOT EXISTS idx_contracts_created_at ON contracts (created_at DESC)`,
          `CREATE INDEX IF NOT EXISTS idx_contracts_contract_number_trgm ON contracts USING gin (contract_number gin_trgm_ops)`,
          `CREATE INDEX IF NOT EXISTS idx_contracts_customer_name_trgm ON contracts USING gin (customer_name gin_trgm_ops)`,
          `CREATE INDEX IF NOT EXISTS idx_contracts_manager_name_trgm ON contracts USING gin (manager_name gin_trgm_ops)`,
          `CREATE INDEX IF NOT EXISTS idx_contracts_products_trgm ON contracts USING gin (products gin_trgm_ops)`,
        ]
      : []),
    ...(hasProducts ? [`CREATE INDEX IF NOT EXISTS idx_products_category ON products (category)`] : []),
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
