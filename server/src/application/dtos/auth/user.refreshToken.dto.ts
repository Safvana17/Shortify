export interface UserRefreshTokenInputDTO {
    token: string
}

export interface UserRefreshTokenOutputDTO {
    user: {
        id: string,
        name: string,
        email: string
        isVerified: boolean
    }
    refreshToken: string
    accessToken: string
}