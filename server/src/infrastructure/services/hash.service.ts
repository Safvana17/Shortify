import { IHashService } from "../../application/services/IHash.service";
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { env } from "../config/env.config";


export class HashService implements IHashService {
    async hash(password: string): Promise<string> {
        const saltRounds = env.BCRYPT_SALT_ROUNDS
        return bcrypt.hash(password, saltRounds)
    }

    async compare( password: string, hashedPassword: string ): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword)
    }

    hashToken(token: string): string {
        return crypto.createHash('sha256').update(token).digest("hex")
    }
}