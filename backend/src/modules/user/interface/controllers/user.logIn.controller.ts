import { Request, Response, NextFunction } from "express"
import { TokenUseCase } from "../../application/useCases/user.token.useCase"
import { UserLoginUseCase } from "../../application/useCases/user.logIn.useCase"
import { SendOTP_UseCase } from "../../application/useCases/user.sendOTP.useCase"
import { UserExistingUseCase } from "../../application/useCases/user.existing.useCase"

export class UserLoginController {
  private tokenUseCase: TokenUseCase
  private sendOtpUseCase: SendOTP_UseCase
  private userLogInUseCase: UserLoginUseCase
  private userExistingUseCase: UserExistingUseCase

  constructor() {
    this.tokenUseCase = new TokenUseCase()
    this.sendOtpUseCase = new SendOTP_UseCase()
    this.userLogInUseCase = new UserLoginUseCase()
    this.userExistingUseCase = new UserExistingUseCase()
  }

  userLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    try {
      // Check if the user exists in the database using the email
      const isUserExisting = await this.userExistingUseCase.userExistingLogIn(email.toLowerCase())

      // If the user does not exist, return a response with userNotExisting flag
      if (!isUserExisting) {
        return res.json({ userNotExisting: true })
      }

      // If the user exists, get the user id by verifying the email and password
      const userId = await this.userLogInUseCase.userLogIn(email, password)

      // Check if the user is verified using the email
      let isVerified = await this.userLogInUseCase.isVerified(email)
      isVerified = !!isVerified

      // If the user id is valid, generate a token with the user id and the isVerified flag
      if (userId) {
        const token = this.tokenUseCase.generateTokenWithUserId(userId, isVerified)

        // If the user is verified, return a response with a success message and the token
        if (isVerified) {
          res.json({ message: "Verification success", token })
        } else {
          // If the user is not verified, send an OTP to the email and return a response with notVerified flag and the token
          await this.sendOtpUseCase.sendOTP(email)
          res.json({ notVerified: true, token })
        }
      }
    } catch (error: any) {
      if (error.message === "InvalidPassword") {
        return res.json({ wrongPassword: true })
      } else if (error.message === "NotVerified") {
        return res.json({ notVerified: true })
      }
      return next(error)
    }
  }
}
