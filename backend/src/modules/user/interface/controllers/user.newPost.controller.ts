import { Request, Response, NextFunction } from 'express'

import { CreatePostUseCase } from '../../application/useCases/user.newPost.useCase'
import { UserPostDataAccess } from '../../data/user.postDataAccess'
import { JwtPayload } from 'jsonwebtoken'

export class UserNewPostController {
  private createPostUseCase: CreatePostUseCase
  private userPostDataAccess: UserPostDataAccess
  private awsService: AwsService

  constructor() {
    this.createPostUseCase = new CreatePostUseCase()
    this.userPostDataAccess = new UserPostDataAccess()
    this.awsService = new AwsService()
  }

  userNewPost = async (req: Request, res: Response, next: NextFunction) => {
        
    console.log(req.body, 20)
    res.send({})
    return

    const { userId } = req.user as JwtPayload
    const text = req.body

    try {
      const timestamp = new Date()
      const postData = { content: text, metrics: { timestamp } }

      const newPost = await this.createPostUseCase.createPost(userId, postData)

      res.json({ message: 'Post created successfully', postData: newPost })
    } catch (error) {
      return next(error)
    }
  }
}
