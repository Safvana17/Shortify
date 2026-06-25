import { IMailService } from "../../application/services/IMail.service";
import { mailTransporter } from "../config/mail.config";
import { otpEmailTemplate } from "../emailTemplates/otpEmail.template";

export class MailService implements IMailService {
    async sendOtp(email: string, otp: string): Promise<void> {
        console.log('from mail service')
        await mailTransporter.sendMail({
            from: 'Shortify',
            to: email,
            subject: 'Your OTP For Verification',
            html: otpEmailTemplate(otp)
        })
    }
}