import { Request, Response, NextFunction } from 'express'

import { InvalidOtpError } from '../../../../shared/errors/invalidOtp.error'
import { UserVerifyOtpUseCase } from '../../application/useCases/user.verifyOtp.useCase'
import { I_UserDecoded } from '../../../../shared/interfaces/userDecoded.interface'
import { TokenUseCase } from '../../application/useCases/user.token.useCase'

export class UserSignUpOtpController {
  private userVerifyOtpUseCase: UserVerifyOtpUseCase
  private tokenUseCase: TokenUseCase

  constructor() {
    this.userVerifyOtpUseCase = new UserVerifyOtpUseCase()
    this.tokenUseCase = new TokenUseCase()
  }

  verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    const { otp } = req.body
    const { userId } = req.user as I_UserDecoded
    try {
      await this.userVerifyOtpUseCase.verifyOtp(userId, otp)
      return res.status(200).json({ message: 'OTP verification successful', otpVerified: true })
    } catch (error: any) {
      console.error(error)
      if (error instanceof InvalidOtpError) {
        return res.json({ invalidOtp: true })
      }

      return next(error)
    }
  }
}
