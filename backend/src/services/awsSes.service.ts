import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"

export class AwsSesService {
  private accessKeyId!: string
  private secretAccessKey!: string
  private region!: string
  private source!: string

  private AWS_SES: SESClient

  constructor() {
    this.accessKeyId = process.env.AWS_SES_ACCESS_KEY!
    this.secretAccessKey = process.env.AWS_SES_SECRET_ACCESS_KEY!
    this.region = process.env.AWS_REGION!
    this.source = process.env.AWS_SES_SENDER!

    const SES_CONFIG = {
      region: this.region,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    }

    this.AWS_SES = new SESClient(SES_CONFIG)
  }

  async sendOtpVerificationEmail(recipient: string, OTP: number) {
    try {
      recipient = "gokul_adler@outlook.com"
      recipient = 'gokuladler@gmail.com'

      const params = {
        Source: this.source,
        Destination: {
          ToAddresses: [recipient],
        },
        ReplyToAddresses: [],
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: `<!DOCTYPE html>
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
            },
            Text: {
              Charset: "UTF-8",
              Data: `The otp for cric is ${OTP}`,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: "OTP from cric",
          },
        },
      }

      const command = new SendEmailCommand(params)
      await this.AWS_SES.send(command)
    } catch (error: any) {
      console.error(error.message)
      throw new Error(error.message)
    }
  }
}
