import { IOtpService } from "../../application/services/IOtp.service";
import bcrypt from 'bcrypt'
import { env } from "../config/env.config";


export class OtpService implements IOtpService {
    generate(): string {
        const otp = Math.floor(100000 + Math.random() * 900000)
        console.log("Otp is: ", otp)
        return otp.toString()
    }

    async hash(otp: string): Promise<string> {
        const saltRounds = env.BCRYPT_SALT_ROUNDS
        return bcrypt.hash(otp, saltRounds)
    }

    async compare(enteredOtp: string, hashedOtp: string): Promise<boolean> {
        return bcrypt.compare(enteredOtp, hashedOtp)
    }
}