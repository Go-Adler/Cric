import { Request, Response, NextFunction } from 'express'
import { UserExistingUseCase } from '../../application/useCases/user.existing.useCase'
import { SendOTP_UseCase } from '../../application/useCases/user.sendOTP.useCase'
import { UserExistingError } from '../../../../shared/errors/userExisting.error'
import { CreateUserUseCase } from '../../application/useCases/user.createUser.useCase'

export class UserSignUpController {
  private userExistingUseCase: UserExistingUseCase
  private sendOTP_UseCase: SendOTP_UseCase
  private createUserUseCase: CreateUserUseCase

  constructor() {
    this.userExistingUseCase = new UserExistingUseCase()
    this.sendOTP_UseCase = new SendOTP_UseCase()
    this.createUserUseCase = new CreateUserUseCase()
  }

  userSignUp = async (req: Request, res: Response, next: NextFunction) => {
    const { userName, phone, email } = req.body
    const userData = req.body

    try {
      await this.userExistingUseCase.userExisting(userName, phone, email)
      await this.createUserUseCase.createUser(userData)
      await this.sendOTP_UseCase.sendOTP(email)

      return res
        .status(200)
        .json({ message: 'User does not exist and otp sent to mail.' })
    } catch (error) {
      if (error instanceof UserExistingError) {
        return res.status(200).json({ error: error.message })
      }
      return next(error)
    }
  }
}
