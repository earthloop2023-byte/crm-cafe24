import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

process.env.NODE_ENV = process.env.NODE_ENV || "production";

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: rootDir,
      env: process.env,
      shell: process.platform === "win32",
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`${command} ${args.join(" ")} exited with ${code ?? signal}`));
    });
  });
}

console.log(`[cafe24-start] NODE_ENV=${process.env.NODE_ENV}`);

if (String(process.env.SKIP_DB_PUSH || "").trim().toLowerCase() !== "true") {
  const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";
  const args = ["drizzle-kit", "push", "--config", "drizzle.config.ts"];
  console.log(`[cafe24-start] running ${npxCommand} ${args.join(" ")}`);
  await run(npxCommand, args);
}

await import("../dist/index.js");
