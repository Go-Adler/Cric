import { Request, Response, NextFunction } from 'express'
import { SendOTP_UseCase } from '../../application/useCases/user.sendOTP.useCase'
import { TokenUseCase } from '../../application/useCases/user.token.useCase'
import { JwtPayload } from 'jsonwebtoken'
import { GetUserDataUseCase } from '../../application/useCases/user.getData.useCase'

export class UserResendOtpController {
  private getUserDataUseCase: GetUserDataUseCase
  private sendOtpUseCase: SendOTP_UseCase
  private tokenUseCase: TokenUseCase

  constructor() {
    this.getUserDataUseCase = new GetUserDataUseCase()
    this.sendOtpUseCase = new SendOTP_UseCase()
    this.tokenUseCase = new TokenUseCase()
  }

  resendOtp = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload

    try {
      const email = await this.getUserDataUseCase.getEmail(userId)
      
      if (!userId) {
        return res.json({ userNotExisting: true })
      }
      const verifyToken = this.tokenUseCase.generateTokenWithUserId(userId, true)

      await this.sendOtpUseCase.sendOTP(email)

      res.json({ otpSent: true, verifyToken })
    } catch (error: any) {
      return next(error)
    }
  }
}