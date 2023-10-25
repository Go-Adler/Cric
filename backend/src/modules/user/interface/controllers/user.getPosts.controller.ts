import { NextFunction, Request, Response } from "express"
import { GetUserPostsUseCase } from "../../application/useCases/user.getPosts.useCase"
import { JwtPayload } from "jsonwebtoken"
import { GetAwsUrlUseCase } from "../../application/useCases/user.getAwsUrl.useCase"
import { PostActionsUseCase } from "../../application/useCases/user.postActionsCheck.useCase"
import { GetUserDataUseCase } from "../../application/useCases/user.getData.useCase"

export class GetUserPostsController {
  private getUserPostsUseCase: GetUserPostsUseCase
  private getAwsUrlUseCase: GetAwsUrlUseCase
  private getDataUseCase: GetUserDataUseCase
  private postActionsUseCase: PostActionsUseCase

  constructor() {
    this.getUserPostsUseCase = new GetUserPostsUseCase()
    this.getAwsUrlUseCase = new GetAwsUrlUseCase()
    this.postActionsUseCase = new PostActionsUseCase()
    this.getDataUseCase = new GetUserDataUseCase()
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

  getFriendsPosts = async (req: Request, res: Response, next: NextFunction) => {
    const { skip, userName } = req.body
    const { userId } = req.user as JwtPayload
    try {
      const friendId = await this.getDataUseCase.getUserId(userName)
      const postsWithoutUrl = await this.getUserPostsUseCase.getUserPosts(friendId, skip)
      let posts = await this.getAwsUrlUseCase.getPostsWithUrl(postsWithoutUrl)
      posts = this.postActionsUseCase.likedPosts(userId, posts)
    
      res.json({posts})
    } catch (error) {
      return next(error)
    }
  }

}