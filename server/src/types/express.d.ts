import 'express-serve-static-core'
import { AccessTokenPayload } from '../application/services/IToken.service';

declare module 'express-serve-static-core' {
    interface Request {
        user?: AccessTokenPayload;
        validatedQuery?: unknown;
        validatedParams?: unknown;
    }
}

export {}