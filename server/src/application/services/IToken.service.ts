export interface AccessTokenPayload {
    id: string
    email: string
}

export interface RefreshTokenPayload {
    id: string
}


export interface ITokenService{
    generateAccessToken(payload: AccessTokenPayload): string
    generateRefreshToken(payload: RefreshTokenPayload): string
    verifyAccessToken(token: string): AccessTokenPayload
    verifyRefreshToken(token: string): RefreshTokenPayload
    blackListToken(token: string, expiresInSeconds: number): Promise<void>
    isTokenBlackListed(token: string): Promise<boolean>
}

