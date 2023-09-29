import AWS from 'aws-sdk';

export class AwsSesService {
  async sendOtpVerificationEmail(recipient: string, OTP: number) {
    try {
      const SES_CONFIG = {
        accessKeyId: process.env.AWS_SES_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
        region: process.env.BUCKET_REGION
      }

      const AWS_SES = new AWS.SES(SES_CONFIG)

      // Configure AWS SDK
      AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
      });
          
      // const ses = new AWS.SES({ apiVersion: '2010-12-01' });
  
      const params = {
        Destination: {
          ToAddresses: ['recipient@example.com'],
        },
        Message: {
          Body: {
            Text: { Data: 'Hello, this is a test email!' },
          },
          Subject: { Data: 'Test Email' },
        },
        Source: 'sender@example.com',
      };
  
      ses.sendEmail(params, (err, data) => {
        if (err) console.error(err, err.stack);
        else console.log(data);
      });
  
    }
  }
}