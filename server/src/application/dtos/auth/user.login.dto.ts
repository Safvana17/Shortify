export interface UserLoginInputDTO {
    email: string
    password: string
}

export interface UserLoginOutputDTO {
    user: {
        id: string
        name: string
        email: string
        isVerified: boolean
    },
    accessToken: string,
    refreshToken: string
}