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
    const { email } = req.user as JwtPayload
    const text = req.body

    try {
      const postData = { content: text }

      this.createPostUseCase.createPost(email, postData)
      const posts = this.userPostDataAccess.getUserPosts(email)

      res.json({message: 'Post created successfully', posts})
    } catch (error) {
      return next(error)
    }
  }
}
