import { NextFunction, Request, Response } from "express"
import { JwtPayload } from "jsonwebtoken"
import { LikePostUseCase } from "../../application/useCases/user.likePost.useCase"


export class PostLikeController {
  private likePostUseCase: LikePostUseCase
  constructor() {
    this.likePostUseCase = new LikePostUseCase()
  }

  likePost = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload
    const { postId } = req.body
    try {
      await this.likePostUseCase.likePost(userId, postId)
    } catch (error) {
      return next(error)
    }
  }

}