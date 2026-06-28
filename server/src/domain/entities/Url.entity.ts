export class UrlEntity {
    id: string
    userId: string
    originalUrl: string
    shortCode: string
    clicks?: number

    constructor (id: string, userId: string, originalUrl: string, shortCode: string) {
        this.id = id
        this.userId = userId
        this.originalUrl = originalUrl
        this.shortCode = shortCode
    }
}