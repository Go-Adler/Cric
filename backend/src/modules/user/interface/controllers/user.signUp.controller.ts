import { Request, Response, NextFunction } from "express"
import { UserExistingUseCase } from "../../application/useCases/user.existing.useCase"
import { SendOTP_UseCase } from "../../application/useCases/user.sendOTP.useCase"
import { UserExistingError } from "../../../../shared/errors/userExisting.error"
import { CreateUserUseCase } from "../../application/useCases/user.createUser.useCase"
import { TokenUseCase } from "../../application/useCases/user.token.useCase"

export class UserSignUpController {
  private userExistingUseCase: UserExistingUseCase
  private sendOTP_UseCase: SendOTP_UseCase
  private createUserUseCase: CreateUserUseCase
  private tokenUseCase: TokenUseCase

  constructor() {
    this.userExistingUseCase = new UserExistingUseCase()
    this.sendOTP_UseCase = new SendOTP_UseCase()
    this.createUserUseCase = new CreateUserUseCase()
    this.tokenUseCase = new TokenUseCase()
  }

  userSignUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userName, phone, email } = req.body
      console.log(req.body)

      // Ensure email is in lowercase for consistency
      const userData = { ...req.body, email: email.toLowerCase(), userName: userName.toLowerCase() }

      // Check if the user already exists
      await this.userExistingUseCase.userExisting(userName, phone, userData.email)

      // Create the user
      const userId = await this.createUserUseCase.createUser(userData)

      // Send OTP to the user's email
      await this.sendOTP_UseCase.sendOTP(userData.email)

      // Generate a verification token
      const verifyToken = this.tokenUseCase.generateTokenWithUserId(userId, false)

      return res.status(200).json({ message: "User sign-up successful", verifyToken })
    } catch (error: any) {
      if (error instanceof UserExistingError) {
        return res.status(200).json({ error: error.message })
      }
      return next(error)
    }
  }
}
