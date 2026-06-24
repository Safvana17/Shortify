import z from "zod";

export const envSchema = z.object({
    PORT: z.coerce.number().positive(),
    MONGODB_URI: z.string().min(1),
    NODEMAILER_PORT: z.coerce.number().positive(),
    NODEMAILER_PASSWORD: z.string().min(1),
    NODEMAILER_EMAIL: z.string().min(1),
    JWT_REFRESH_SECRET: z.string().min(32),
    JWT_ACCESS_SECRET: z.string().min(32),
    REFRESH_TOKEN_MAX_AGE: z.coerce.number(),
    ACCESS_TOKEN_MAX_AGE: z.coerce.number(),
    GOOGLE_CLIENT_ID: z.string(),
    REFRESH_TOKEN_TTL: z.coerce.number(),
    ACCESS_TOKEN_TTL: z.coerce.number(),
    BCRYPT_SALT_ROUNDS: z.coerce.number().int().min(8).max(15),
    FRONTEND_URL:z.string().min(1),

})