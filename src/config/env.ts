import { z } from "zod";

const envSchema = z.object({
  VITE_BACKEND_URL: z.url({ message: "Must be a valid URL" }),
  VITE_API_BASE_URL: z.url({ message: "Must be a valid URL" }),
  VITE_APP_ENV: z
    .enum(["development", "production", "staging"])
    .default("development"),
});

const _env = envSchema.safeParse(import.meta.env);

if (!_env.success) {
  console.error(
    "Invalid frontend environment variables:\n",
    z.prettifyError(_env.error),
  );
  throw new Error(
    "Invalid environment variables. Check your frontend/.env file.",
  );
}

export const env = _env.data;
