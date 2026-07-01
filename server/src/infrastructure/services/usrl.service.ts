import { nanoid } from "nanoid";
import { IUrlService } from "../../application/services/IUrl.service";
import { env } from "../config/env.config";

export class UrlService implements IUrlService {
    async generateCode(): Promise<string> {
        const CODE_LENGTH = env.SHORT_CODE_LENGTH
        return nanoid(CODE_LENGTH)
    }
}