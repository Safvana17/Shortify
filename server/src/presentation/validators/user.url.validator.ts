import { z } from "zod";

export const shortUrlSchema = z.object({
    url: z.string().trim().min(1, 'Url is required')
})

export const UrlParamsSchema = z.object({
    shortCode: z.string()
})

export type UrlParams = z.infer<typeof UrlParamsSchema>