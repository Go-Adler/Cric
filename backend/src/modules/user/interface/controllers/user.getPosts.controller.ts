import { NextFunction, Request, Response } from "express"
import { GetUserPostsUseCase } from "../../application/useCases/user.getPosts.useCase"
import { JwtPayload } from "jsonwebtoken"
import { GetAwsUrlUseCase } from "../../application/useCases/user.getAwsUrl.useCase"

export class GetUserPostsController {
  private getUserPostsUseCase: GetUserPostsUseCase
  private getAwsUrlUseCase: GetAwsUrlUseCase

  constructor() {
    this.getUserPostsUseCase = new GetUserPostsUseCase()
    this.getAwsUrlUseCase = new GetAwsUrlUseCase()
  }

  getUserPosts = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload
    const { skip } = req.body
    try {
      
      const postsWithoutUrl = await this.getUserPostsUseCase.getUserPosts(userId, skip)
      const posts = await this.getAwsUrlUseCase.getPostsWithUrl(postsWithoutUrl)
      res.json({posts})
    } catch (error) {
      return next(error)
    }
  }

}