import { UserResendOtpInputDTO, UserResendOtpOutputDTO } from "../../dtos/auth/user.resendOtp.usecase";

export interface IUserResendOtpUsecase {
    execute(request: UserResendOtpInputDTO): Promise<UserResendOtpOutputDTO>
}