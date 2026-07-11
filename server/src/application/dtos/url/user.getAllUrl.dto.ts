export interface UserGetAllUrlInputDTO{
    userId: string
    page: number
    limit: number
}

export interface UrlDTO {
    id: string
    shortLink: string
    originalLink: string
    shortCode: string
    createdOn: string
    clicks: number
}

export interface UserGetAllUrlOutputDTO {
    urls: UrlDTO[]
    totalPages: number
    totalCount: number
}