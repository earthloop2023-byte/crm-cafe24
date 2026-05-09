const DB_URL_ENV_NAME = "DATABASE_URL";

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

function appendSslMode(connectionUrl: string): string {
  const sslMode = firstEnv(["DB_SSLMODE", "PGSSLMODE"]);
  const useSsl = firstEnv(["DB_SSL", "PGSSL"]).toLowerCase();
  const requestedSslMode = sslMode || (["1", "true", "yes", "on"].includes(useSsl) ? "require" : "");
  if (!requestedSslMode) return connectionUrl;

  const parsed = new URL(connectionUrl);
  if (!parsed.searchParams.has("sslmode")) {
    parsed.searchParams.set("sslmode", requestedSslMode);
  }
  return parsed.toString();
}

export function resolveDatabaseUrl(): string {
  const explicitUrl = readEnv(DB_URL_ENV_NAME);
  if (explicitUrl) return explicitUrl;

  const host = firstEnv(["DB_HOST", "PGHOST"]);
  const database = firstEnv(["DB_NAME", "DB_DATABASE", "POSTGRES_DB", "PGDATABASE"]);
  const user = firstEnv(["DB_USER", "DB_USERNAME", "POSTGRES_USER", "PGUSER"]);
  const password = firstEnv(["DB_PASSWORD", "POSTGRES_PASSWORD", "PGPASSWORD"]);
  const port = firstEnv(["DB_PORT", "PGPORT"]) || "5432";

  if (!host || !database || !user) {
    return "";
  }

  const auth = password ? `${encodeURIComponent(user)}:${encodeURIComponent(password)}` : encodeURIComponent(user);
  const connectionUrl = `postgres://${auth}@${host}:${encodeURIComponent(port)}/${encodeURIComponent(database)}`;
  return appendSslMode(connectionUrl);
}

export function ensureDatabaseUrl(): string {
  const databaseUrl = resolveDatabaseUrl();
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not set and DB_HOST/DB_PORT/DB_NAME/DB_USER/DB_PASSWORD are incomplete.",
    );
  }

  process.env[DB_URL_ENV_NAME] = databaseUrl;
  return databaseUrl;
}
