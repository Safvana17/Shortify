import z from "zod";

export const envSchema = z.object({
    PORT: z.coerce.number().positive()
})