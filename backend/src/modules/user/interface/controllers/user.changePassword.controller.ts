import { Request, Response, NextFunction } from 'express'

import { InvalidOtpError } from '../../../../shared/errors/invalidOtp.error'
import { I_UserDecoded } from '../../../../shared/interfaces/userDecoded.interface'
import { TokenUseCase } from '../../application/useCases/user.token.useCase'
import { UserChangePasswordUseCase } from '../../application/useCases/user.changePassword.useCase'
import { PasswordManager } from '../../../../utils/bcrypt.utils'


export class UserChangePasswordController {
  private tokenUseCase: TokenUseCase
  private changePasswordUseCase: UserChangePasswordUseCase
  private passwordManager: PasswordManager

  constructor() {
    this.tokenUseCase = new TokenUseCase()
    this.changePasswordUseCase = new UserChangePasswordUseCase()
    this.passwordManager = new PasswordManager()
  }

  changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password } = req.body
      const { userId } = req.user as I_UserDecoded
      const passwordHash = await this.passwordManager.hashPassword(password);
      await this.changePasswordUseCase.changePassword(userId, passwordHash)

      const token = this.tokenUseCase.generateTokenWithUserId(userId, true)
      return res
        .status(200)
        .json({
          message: 'Password successfully changed',
          token,
          changePassword: true,
        })
    } catch (error: any) {
      console.log(error.stack)

      if (error instanceof InvalidOtpError) {
        return res.status(401).json({ messages: 'Invalid OTP' })
      }

      return next(error)
    }
  }
}
