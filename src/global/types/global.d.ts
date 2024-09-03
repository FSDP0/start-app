export = global;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string>, Record<string, string | number> {
      NODE_ENV: "local" | "development" | "production";
    }
  }
}
