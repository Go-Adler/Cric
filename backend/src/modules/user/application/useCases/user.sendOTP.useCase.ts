import { UserOtpDataAccess } from '../../data/user.otp.dataAccess';
import { generateOTP } from '../../../../utils/generateOTP.utils';
import { AwsSesService } from '../../../../services/awsSes.service';

export class SendOTP_UseCase {
  private awsSesService: AwsSesService;
  private userOtpDataAccess: UserOtpDataAccess;

  constructor() {
    this.userOtpDataAccess = new UserOtpDataAccess();
    this.awsSesService = new AwsSesService();
  }

  /**
   * Send an OTP verification email to the specified email address.
   * @param email - Email address to which the OTP email will be sent.
   * @returns True if the OTP email was sent successfully.
   * @throws Error if there was an issue sending the OTP email.
   */
  sendOTP = async (email: string): Promise<boolean> => {
    try {
      // Generate a one-time password (OTP)
      const otp = generateOTP();

      // Send the OTP verification email
      await this.awsSesService.sendOtpVerificationEmail(email, otp);

      // Store the OTP in the data access layer
      await this.userOtpDataAccess.addOtp(email, otp);

      return true;
    } catch (error: any) {
      console.error(`Error sending OTP email: ${error.message}`);
      throw new Error('Failed to send OTP email.');
    }
  };
}
