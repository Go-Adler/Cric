import { NextFunction, Request, Response } from "express"
import { GetUserPostsUseCase } from "../../application/useCases/user.getPosts.useCase"
import { JwtPayload } from "jsonwebtoken"
import { GetAwsUrlUseCase } from "../../application/useCases/user.getAwsUrl.useCase"
import { PostActionsUseCase } from "../../application/useCases/user.postActionsCheck.useCase"

export class GetUserPostsController {
  private getUserPostsUseCase: GetUserPostsUseCase
  private getAwsUrlUseCase: GetAwsUrlUseCase
  private postActionsUseCase: PostActionsUseCase

  constructor() {
    this.getUserPostsUseCase = new GetUserPostsUseCase()
    this.getAwsUrlUseCase = new GetAwsUrlUseCase()
    this.postActionsUseCase = new PostActionsUseCase()
  }

  getUserPosts = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload
    const { skip } = req.body
    try {
      
      const postsWithoutUrl = await this.getUserPostsUseCase.getUserPosts(userId, skip)
      let posts = await this.getAwsUrlUseCase.getPostsWithUrl(postsWithoutUrl)
      posts = this.postActionsUseCase.likedPosts(userId, posts)
    
      res.json({posts})
    } catch (error) {
      return next(error)
    }
  }

}