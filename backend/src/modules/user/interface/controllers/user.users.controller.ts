import { NextFunction, Request, Response } from "express"
import { UsersUseCase } from '../../application/useCases/user.users.useCase'
import { GetAwsUrlUseCase } from "../../application/useCases/user.getAwsUrl.useCase"

export class UsersController {
  private usersUseCase: UsersUseCase
  private getAwsUrlUseCase: GetAwsUrlUseCase  

  constructor() {
    this.usersUseCase = new UsersUseCase()
    this.getAwsUrlUseCase = new GetAwsUrlUseCase()
  }

  findUsers = async (req: Request, res: Response, next: NextFunction) => {
    const { input } = req.body
    try {
      const usersWithoutUrl = await this.usersUseCase.findUsers(input)
      const users = await this.getAwsUrlUseCase.getImageUrlUsersFind(usersWithoutUrl)
      res.json({ users })
    } catch (error) {
      return next(error)
    }
  }
}