import { UserOtpDataAccess } from '../../data/user.otpAccess'
import { UserDataAccess } from '../../data/user.dataAccess'
import { InvalidOtpError } from '../../../../shared/errors/invalidOtp.error'

export class UserVerifyOtpUseCase {
  private userOtpDataAccess: UserOtpDataAccess
  private userDataAccess: UserDataAccess

  constructor() {
    this.userOtpDataAccess = new UserOtpDataAccess()
    this.userDataAccess = new UserDataAccess()
  }

  verifyOtp = async (email: string, otp: number) => {
    try {
      // Check if the otp matches
      const OTP = await this.userOtpDataAccess.getOtp(email)
      console.log(otp, OTP, 18);
      
      if (OTP !== otp) {
        throw new InvalidOtpError('Incorrect otp')
      }

      await this.userDataAccess.verifyUser(email)
      return true
    } catch (error) {
      throw error
    }
  }
}
