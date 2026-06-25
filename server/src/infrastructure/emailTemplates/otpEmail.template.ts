export const otpEmailTemplate = (otp: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">
        <table width="500px" cellpadding="0" cellspacing="0" 
          style="background:#ffffff; border-radius:10px; padding:30px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
          <tr>
            <td align="center">
              <h2 style="color:#333; margin-bottom:10px;">
                Verify Your Email
              </h2>
              <p style="color:#666; font-size:15px; line-height:1.5;">
                Thank you for signing up. Use the verification code below to complete your email verification.
              </p>
              <div style="
                margin:30px 0;
                padding:15px;
                background:#f0f7ff;
                border-radius:8px;
                font-size:32px;
                font-weight:bold;
                letter-spacing:8px;
                color:#2563eb;
              ">
                ${otp}
              </div>
              <p style="color:#777; font-size:14px;">
                This OTP is valid for <strong>5 minutes</strong>.
              </p>
              <p style="color:#777; font-size:14px;">
                If you did not request this verification, you can safely ignore this email.
              </p>
              <hr style="border:none; border-top:1px solid #eee; margin:25px 0;" />
              <p style="font-size:12px; color:#999;">
                © ${new Date().getFullYear()} Your Company. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;