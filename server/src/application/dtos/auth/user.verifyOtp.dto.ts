export interface UserVerifyOtpInputDTO {
    email: string
    otp: string
}

export interface UserVerifyOtpOutputDTO {
    success: boolean
}