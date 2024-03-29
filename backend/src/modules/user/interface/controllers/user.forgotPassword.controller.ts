import { Request, Response, NextFunction } from 'express'
import { UserExistingUseCase } from '../../application/useCases/user.existing.useCase'
import { SendOTP_UseCase } from '../../application/useCases/user.sendOTP.useCase'
import { TokenUseCase } from '../../application/useCases/user.token.useCase'

export class UserForgotPasswordController {
  private userExistingUseCase: UserExistingUseCase
  private sendOtpUseCase: SendOTP_UseCase
  private tokenUseCase: TokenUseCase

  constructor() {
    this.userExistingUseCase = new UserExistingUseCase()
    this.sendOtpUseCase = new SendOTP_UseCase()
    this.tokenUseCase = new TokenUseCase()
  }

  forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body

    try {
      const userId = await this.userExistingUseCase.userExistingLogIn(
        email
      )
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
