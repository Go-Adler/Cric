import { Request, Response, NextFunction } from 'express'
import { GetUserDataUseCase } from '../../../user/application/useCases/user.getData.useCase'

export class GetUsersController {
  private getUserDataUseCase: GetUserDataUseCase
  constructor() {
    this.getUserDataUseCase = new GetUserDataUseCase()
  }

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.getUserDataUseCase.getAllUsers()
      res.json({ message: 'Verification success',  users})
    } catch (error: any) {
      return next(error)
    }
  }

  blockUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body
      const user = await this.getUserDataUseCase.blockUser(userId)
      res.json({ message: 'user blocked',  user})
    } catch (error: any) {
      return next(error)
    }
  }

  unblockUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body
      const user = await this.getUserDataUseCase.unblockUser(userId)
      res.json({ message: 'user unblocked',  user})
    } catch (error: any) {
      return next(error)
    }
  }
}
