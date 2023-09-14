import { Request, Response, NextFunction } from 'express'
import { UserExistingUseCase } from '../../../user/application/useCases/user.existing.useCase'
import { UserLoginUseCase } from '../../../user/application/useCases/user.logIn.useCase'
import { TokenUseCase } from '../../../user/application/useCases/user.token.useCase'
import { SendOTP_UseCase } from '../../../user/application/useCases/user.sendOTP.useCase'

export class AdminLoginController {
  private userExistingUseCase: UserExistingUseCase
  private userLogInUseCase: UserLoginUseCase
  private tokenUseCase: TokenUseCase
  private sendOtpUseCase: SendOTP_UseCase

  constructor() {
    this.userExistingUseCase = new UserExistingUseCase()
    this.userLogInUseCase = new UserLoginUseCase()
    this.tokenUseCase = new TokenUseCase()
    this.sendOtpUseCase = new SendOTP_UseCase()
  }

  adminLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    try {
      const userId = await this.userExistingUseCase.userExistingLogIn(
        email
      )
      if (!userId) {
        return res.json({ userNotExisting: true })
      }
      await this.userLogInUseCase.userLogIn(email, password)

      const token = this.tokenUseCase.generateTokenWithUserId(userId, true)

      res.json({ message: 'Verification success', token })
    } catch (error: any) {
      if (error.message === 'InvalidPassword') {
        return res.json({ wrongPassword: true })
      } else if (error.message === 'NotVerified') {
        return res.json({ notVerified: true })
      }
      return next(error)
    }
  }
}
