import { Request, Response, NextFunction } from "express"

import { JwtPayload } from "jsonwebtoken"
import { GetUserDataUseCase } from "../../application/useCases/user.getData.useCase"
import { GetAwsUrlUseCase } from "../../application/useCases/user.getAwsUrl.useCase"

export class UserDataController {
  private userDataUseCase: GetUserDataUseCase
  private getAwsUrlUseCase: GetAwsUrlUseCase

  constructor() {
    this.userDataUseCase = new GetUserDataUseCase()
    this.getAwsUrlUseCase = new GetAwsUrlUseCase()
  }

  userBasicInfo = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload
    try {
      let profilePicture = await this.userDataUseCase.getProfilePicture(userId)
      profilePicture = await this.getAwsUrlUseCase.getImageUrl(profilePicture)
      const userName = await this.userDataUseCase.getUserName(userId)
      const name = await this.userDataUseCase.getName(userId)
      res.json({
        profilePicture,
        name,
        userName,
        message: "user info fetched success",
      })
    } catch (error) {
      return next(error)
    }
  }
}
