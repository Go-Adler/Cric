import { Request, Response, NextFunction } from 'express'
import { UserExistingUseCase } from '../../application/useCases/user.existing.useCase'
import { UserLoginUseCase } from '../../application/useCases/user.logIn.useCase'
import { TokenUseCase } from '../../application/useCases/user.token.useCase'
import { SendOTP_UseCase } from '../../application/useCases/user.sendOTP.useCase'

export class UserLoginController {
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

  userLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    try {
      const isUserExisting = await this.userExistingUseCase.userExistingLogIn(email)

      if (!isUserExisting) {
        return res.json({ userNotExisting: true })
      }
      let userId = await this.userLogInUseCase.userLogIn(email, password)

      let isVerified = await this.userLogInUseCase.isVerified(email)
      isVerified = !!isVerified

      const token = this.tokenUseCase.generateToken(email, isVerified, userId)

      if (isVerified) res.json({ message: 'Verification success', token })
      else {
        await this.sendOtpUseCase.sendOTP(email)
        res.json({ notVerified: true, token })
      }
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
