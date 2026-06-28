import { z } from "zod";

export const shortUrlSchema = z.object({
    url: z.string().trim().min(1, 'Url is required')
})