import { Request, Response, NextFunction } from 'express'

import { CreatePostUseCase } from '../../application/useCases/user.newPost.useCase'
import { UserPostDataAccess } from '../../data/user.postDataAccess'
import { JwtPayload } from 'jsonwebtoken'

export class UserNewPostController {
  private createPostUseCase: CreatePostUseCase
  private userPostDataAccess: UserPostDataAccess

  constructor() {
    this.createPostUseCase = new CreatePostUseCase()
    this.userPostDataAccess = new UserPostDataAccess()
  }

  userNewPost = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload
    const text = req.body

    try {
      const timestamp = new Date()
      const postData = { content: text, metrics: {timestamp} }

      const newPost =  await this.createPostUseCase.createPost(userId, postData)
      console.log(newPost, 25);
      
      res.json({ message: 'Post created successfully', postData: newPost })
    } catch (error) {
      return next(error)
    }
  }
}
