import { UserOtpDataAccess } from '../../data/user.otpAccess'
import { InvalidOtpError } from '../../../../shared/errors/invalidOtp.error'

export class UserVerifyOtpUseCase {
  private userOtpDataAccess: UserOtpDataAccess

  constructor() {
    this.userOtpDataAccess = new UserOtpDataAccess()
  }

  verifyOtp = async (email: string, otp: number) => {
    try {
      // Check if the otp matches
      const OTP = await this.userOtpDataAccess.getOtp(email)
      
      if (OTP !== otp) {
        throw new InvalidOtpError('Incorrect otp')
      }

      return true
    } catch (error) {
      throw error
    }
  }
}
