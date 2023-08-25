import { UserOtpDataAccess } from '../../data/user.otpAccess';
import { generateOTP } from '../../../../utils/generateOTP.utils';
import { EmailService } from '../../../../services/email.service';

export class SendOTP_UseCase {
  private emailService: EmailService
  private userOtpDataAccess: UserOtpDataAccess

  constructor() {
    this.emailService = new EmailService()
    this.userOtpDataAccess = new UserOtpDataAccess()
  }

  async sendOTP(email: string) {
    try {

      const otp = generateOTP()
      console.log(otp, 'otp');
      
      // await this.emailService.sendOTPVerificationEmail(email, otp);
      await this.userOtpDataAccess.addOtp(email, otp)
      return true
    } catch (error) {
      throw error
    }
  }
}
