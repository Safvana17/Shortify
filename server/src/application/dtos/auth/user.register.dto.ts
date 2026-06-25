export interface UserRegisterInputDTO {
    name: string
    email: string
    password: string
}

export interface UserRegisterOutputDTO {
    success: boolean
}