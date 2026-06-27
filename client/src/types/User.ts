export interface User {
    id: string
    name: string
    email: string
    isVerified: boolean
}

export interface RegisterUserPayload {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export interface LoginUserResponse {
    user: User,
    accessToken: string
}