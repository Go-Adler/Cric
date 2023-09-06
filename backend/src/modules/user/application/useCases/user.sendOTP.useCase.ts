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

  sendOTP = async (email: string) => {
    try {

      const otp = generateOTP()
      console.log(otp, 'otp');
      await this.emailService.sendOTPVerificationEmail(email, otp);
      await this.userOtpDataAccess.addOtp(email, otp)
      return true
    } catch (error: any) {
      console.log(error.message, 23);
      throw error
    }
  }
}
