import sgMail from '@sendgrid/mail';

export class EmailService {
  async sendOTPVerificationEmail(recipient: string ) {
    try {
      const sendGridApiKey = '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'
      sgMail.setApiKey(sendGridApiKey);

      const message = {
        to: recipient,
        from: "gokuladler@gmail.com",
        subject: "4ACE-9AD7-19B2489F1D63",
        text: `OTP`,
        html: `Please give access to my accout, my new ip address is 103.42.197.214, `,
      };
      await sgMail.send(message);
      console.log('mail sent');
      
      return true;
    } catch (error: any) {
      console.error(`Error in sending OTP verification email: ${error.message}`);
      throw new Error(`Error in sending OTP verification email: ${error}`);
    }
  }
}

const k = new EmailService()

k.sendOTPVerificationEmail('sendgridtesting@gmail.com')