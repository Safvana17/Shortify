import { z } from "zod";

export const shortUrlSchema = z.object({
    url: z.string().trim().min(1, 'Url is required')
})

export const UrlParamsSchema = z.object({
    shortCode: z.string()
})

export type UrlParams = z.infer<typeof UrlParamsSchema>

export const UrlQuerySchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10)
})
export type UrlQuery = z.infer<typeof UrlQuerySchema>