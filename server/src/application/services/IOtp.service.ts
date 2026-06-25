export interface IOtpService {
    generate(): string
    hash(otp: string): Promise<string>
    compare(enteredOtp: string, hashedOtp: string): Promise<boolean>
}