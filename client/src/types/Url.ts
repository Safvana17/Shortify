export interface Url {
    id: string
    originalLink: string
    shortLink: string
    clicks: number
    createdOn: string
}

export interface GetAllLinksResponse {
    urls: Url[]
    totalCount: number
    totalPages: number
}