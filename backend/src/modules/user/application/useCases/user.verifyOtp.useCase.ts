import { UserOtpDataAccess } from '../../data/user.otpAccess'
import { UserDataAccess } from '../../data/user.dataAccess'
import { InvalidOtpError } from '../../../../shared/errors/invalidOtp.error'
import { Types } from 'mongoose'

export class UserVerifyOtpUseCase {
  private userOtpDataAccess: UserOtpDataAccess
  private userDataAccess: UserDataAccess

  constructor() {
    this.userOtpDataAccess = new UserOtpDataAccess()
    this.userDataAccess = new UserDataAccess()
  }

  verifyOtp = async (userId: Types.ObjectId, otp: number) => {
    try {
      // Check if the otp matches
      const OTP = await this.userOtpDataAccess.getOtp(userId)
      
      if (OTP !== otp) {
        throw new InvalidOtpError('Incorrect otp')
      }

      await this.userDataAccess.verifyUser(userId)
      return true
    } catch (error) {
      throw error
    }
  }
}
