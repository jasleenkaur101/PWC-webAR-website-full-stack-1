import 'dotenv/config';
import { z } from 'zod';

const EnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
  PORT: z.coerce.number().default(5174),
  JWT_SECRET: z.string().min(16),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  CORS_ORIGIN: z.string().optional(),
});

export const env = EnvSchema.parse(process.env);
