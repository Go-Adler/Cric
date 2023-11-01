import { Request, Response, NextFunction } from 'express'

import { JwtPayload } from 'jsonwebtoken'
import { GetUserDataUseCase } from '../../application/useCases/user.getData.useCase'

export class UserDataController {
  private userDataUseCase: GetUserDataUseCase

  constructor() {
    this.userDataUseCase = new GetUserDataUseCase()
  }

  userProfilePictureUpload = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
    } catch (error) {
      return next(error)
    }
  }
}
