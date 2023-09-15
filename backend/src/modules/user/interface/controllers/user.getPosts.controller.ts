import { NextFunction, Request, Response } from "express"
import { GetUserPostsUseCase } from "../../application/useCases/user.getPosts.useCase"
import { JwtPayload } from "jsonwebtoken"

export class GetUserPostsController {
  private getUserPostsUseCase: GetUserPostsUseCase

  constructor() {
    this.getUserPostsUseCase = new GetUserPostsUseCase()
  }

  getUserPosts = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload
    const { skip } = req.body

    try {
      const posts = await this.getUserPostsUseCase.getUserPosts(userId, skip)
      res.json({posts})
    } catch (error) {
      return next(error)
    }
  }

}