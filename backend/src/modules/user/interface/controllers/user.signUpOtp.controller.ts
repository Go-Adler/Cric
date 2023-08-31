import { Request, Response, NextFunction } from 'express'

import { InvalidOtpError } from '../../../../shared/errors/invalidOtp.error'
import { UserVerifyOtpUseCase } from '../../application/useCases/user.verifyOtp.useCase'
import { I_UserDecoded } from '../../../../shared/interfaces/userDecoded.interface'

export class UserSignUpOtpController {
  private userVerifyOtpUseCase: UserVerifyOtpUseCase

  constructor() {
    this.userVerifyOtpUseCase = new UserVerifyOtpUseCase()
  }

  verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    const { otp } = req.body
    const { email } = req.user as I_UserDecoded
    try {
      await this.userVerifyOtpUseCase.verifyOtp(email, otp)

      return res.status(200).json({ message: 'OTP verification successful' })
    } catch (error: any) {
      console.log(error.stack)

      if (error instanceof InvalidOtpError) {
        return res.status(401).json({ messages: 'Invalid OTP' })
      }

      return next(error)
    }
  }
}
