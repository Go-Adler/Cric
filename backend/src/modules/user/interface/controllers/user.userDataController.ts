import { Request, Response, NextFunction } from 'express'

import { JwtPayload } from 'jsonwebtoken'
import { GetUserDataUseCase } from '../../application/useCases/user.getData.useCase'

export class UserDataController {
  private userDataUseCase: GetUserDataUseCase

  constructor() {
    this.userDataUseCase = new GetUserDataUseCase()
  }

  userProfilePicture = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log(14)

    const { userId } = req.user as JwtPayload
    try {
      const userProfilePicture =
        await this.userDataUseCase.getUserProfilePicture(userId)

      res.json({ message: 'post fetched successfully', userProfilePicture })
    } catch (error) {
      return next(error)
    }
  }
}
