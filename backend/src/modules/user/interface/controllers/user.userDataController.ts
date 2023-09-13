import { Request, Response, NextFunction } from 'express'

import { JwtPayload } from 'jsonwebtoken'
import { GetUserDataUseCase } from '../../application/useCases/user.getData.useCase'

export class UserDataController {
  private userDataUseCase: GetUserDataUseCase

  constructor() {
    this.userDataUseCase = new GetUserDataUseCase()
  }

  userBasicInfo = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload
    try {
      const profilePicture = await this.userDataUseCase.getProfilePicture(
        userId
      )
      const name = await this.userDataUseCase.getName(userId)
      res.json({
        profilePicture,
        name,
        message: 'user info fetched success',
      })
    } catch (error) {
      return next(error)
    }
  }
}
