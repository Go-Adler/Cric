import { UserTempDataAccess } from '../../data/user.temp.dataAccess'
import { InvalidOtpError } from '../../../../shared/errors/invalidOtp.error'

export class UserVerifyOtpUseCase {
  private userTempDataAccess: UserTempDataAccess

  constructor() {
    this.userTempDataAccess = new UserTempDataAccess()
  }

  verifyOtp = async (email: string, otp: number) => {
    try {
      // Check if the otp matches
      const OTP = await this.userTempDataAccess.getOTP_ByEmail(email)
      
      if (OTP !== otp) {
        throw new InvalidOtpError('Incorrect otp')
      }

      return true
    } catch (error) {
      throw error
    }
  }
}
