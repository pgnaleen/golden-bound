import { z } from "zod";

const configSchema = z.object({
  // Environment
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  BASE_API_URL: z
    .enum(["development", "production", "test"])
    .default("development"),
});

function getConfig() {
  const env = {
    BASE_API_URL: process.env.BASE_API_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NODE_ENV: process.env.NODE_ENV,
  };

  try {
    return configSchema.parse(env);
  } catch (error) {
    console.error("❌ Invalid environment configuration:", error);
    throw new Error("Invalid environment configuration");
  }
}

export const config = getConfig();
