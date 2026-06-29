export interface IUserLogoutUsecase {
    execute(refreshToken: string, accessToken: string): Promise<void>
}