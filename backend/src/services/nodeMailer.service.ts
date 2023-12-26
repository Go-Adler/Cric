import { createTransport } from "nodemailer"
import { ErrorHandling } from "../utils/handleError.utils"

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: "goadler.dev.mail@gmail.com",
    pass: "lrhw jqtm sqss ujno ",
  },
})

export class NodeMailerService {
  async sendMail(email: string, otp: number) {
    try {
      const mailOptions = this.getMailOptions(email, otp)
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error)
        } else {
          console.log("Email sent:", info.response)
        }
      })
    } catch (error) {
      ErrorHandling.processError("Error in sendMail, NodeMailerService", error)
    }
  }

  getMailOptions(email: string, otp: number) {
    return {
      from: "goadler.dev.mail@gmail.com",
      to: email,
      subject: "Cric Verification",
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
        <div class="otp">OTP: ${otp}</div>
        <p class="note">This OTP is valid for a limited time only. Do not share it with anyone. If you didn't request this OTP, please ignore this email.</p>
        <p>Thank you for using CricApp!</p>
        <div class="footer">Best regards,<br>The CricApp Team</div>
      </div>
    </body>
    </html>
    `,
    }
  }
}
