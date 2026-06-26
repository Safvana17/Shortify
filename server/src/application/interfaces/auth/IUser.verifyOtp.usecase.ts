import { UserVerifyOtpInputDTO, UserVerifyOtpOutputDTO } from "../../dtos/auth/user.verifyOtp.dto";

export interface IUserVerifyOtpUsecase {
    execute(request: UserVerifyOtpInputDTO): Promise<UserVerifyOtpOutputDTO>
}