import Redis from "ioredis";
import { IOtpStoreService } from "../../application/services/IOtpStore.service";

export class OtpStoreService implements IOtpStoreService {
    constructor (
        private _redis: Redis
    ) {}

    async saveOtp(userId: string, otp: string, ttlSeconds: number): Promise<void> {
        await this._redis.set(userId, otp, "EX", ttlSeconds)
    }

    async getOtp(userId: string): Promise<string | null> {
        return this._redis.get(userId)
    }

    async deleteOtp(userId: string): Promise<void> {
        await this._redis.del(userId)
    }
}