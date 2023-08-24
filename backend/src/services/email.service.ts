import sgMail from '@sendgrid/mail';

export class EmailService {
  async sendOTPVerificationEmail(recipient: string, OTP: number) {
    try {
      const sendGridApiKey = process.env.SENDGRID_API_KEY!
      sgMail.setApiKey(sendGridApiKey);

      const message = {
        to: recipient,
        from: "gokul_adler@outlook.com",
        subject: "CricApp OTP",
        text: `OTP ${OTP}`,
        html: `<!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #e0e0e0;
          }
          .header {
            text-align: center;
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
          }
          .otp {
            font-size: 28px;
            font-weight: bold;
            color: #007bff;
            margin: 10px 0;
          }
          .note {
            color: #777;
            margin-top: 20px;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">CricApp OTP Verification</div>
          <p>Hello,</p>
          <p>Please use the following One-Time Password (OTP) to complete your verification for CricApp:</p>
          <div class="otp">OTP: ${OTP}</div>
          <p class="note">This OTP is valid for a limited time only. Do not share it with anyone. If you didn't request this OTP, please ignore this email.</p>
          <p>Thank you for using CricApp!</p>
          <div class="footer">Best regards,<br>The CricApp Team</div>
        </div>
      </body>
      </html>
      `,
      };
      await sgMail.send(message);
      return true;
    } catch (error: any) {
      console.error(`Error in sending OTP verification email: ${error.message}`);
      throw new Error(`Error in sending OTP verification email: ${error}`);
    }
  }
}