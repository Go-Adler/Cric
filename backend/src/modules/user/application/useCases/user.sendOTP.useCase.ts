import { UserTempDataAccess } from "../../data/user.temp.dataAccess"
import { generateOTP } from '../../../../utils/generateOTP.utils';
import { EmailService } from '../../../../services/email.service';

export class SendOTP_UseCase {
  private userTempDataAccess: UserTempDataAccess
  private emailService: EmailService

  constructor() {
    this.userTempDataAccess = new UserTempDataAccess()
    this.emailService = new EmailService()
  }

  async sendOTP(email: string) {
    try {

      const OTP = generateOTP()
      await this.emailService.sendOTPVerificationEmail(email, OTP);
      console.log(OTP);
      await this.userTempDataAccess.createOTP_Data(email, OTP)

      return true
    } catch (error) {
      throw error
    }
  }
}
