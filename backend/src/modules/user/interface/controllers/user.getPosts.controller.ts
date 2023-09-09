import { NextFunction, Request, Response } from "express"
import { GetUserPostsUseCase } from "../../application/useCases/user.getPosts.useCase"
import { JwtPayload } from "jsonwebtoken"

export class GetUserPostsController {
  private getUserPostsUseCase: GetUserPostsUseCase

  constructor() {
    this.getUserPostsUseCase = new GetUserPostsUseCase()
  }

  getUserPosts = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.user as JwtPayload

    try {
      const posts = await this.getUserPostsUseCase.getUserPosts(email)
      res.json({posts})
    } catch (error) {
      return next(error)
    }
  }

}