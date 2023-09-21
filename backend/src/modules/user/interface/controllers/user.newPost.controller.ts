import { Request, Response, NextFunction } from 'express'
import AWS from 'aws-sdk'

import { CreatePostUseCase } from '../../application/useCases/user.newPost.useCase'
import { UserPostDataAccess } from '../../data/user.postDataAccess'
import { JwtPayload } from 'jsonwebtoken'
import { log } from 'console'

export class UserNewPostController {
  private createPostUseCase: CreatePostUseCase
  private userPostDataAccess: UserPostDataAccess

  constructor() {
    this.createPostUseCase = new CreatePostUseCase()
    this.userPostDataAccess = new UserPostDataAccess()
  }

  userNewPost = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body, 19);
    console.log(req.file, 20);
    
    
    res.send({})
    return
    console.log(req.file, 20);
    console.log(req.body, 20);
    
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.BUCKET_REGION
    });
    console.log(process.env.AWS_ACCESS_KEY);
    console.log(process.env.AWS_SECRET_ACCESS_KEY, 18);
    
    const { userId } = req.user as JwtPayload
    const text = req.body

    try {
      const timestamp = new Date()
      const postData = { content: text, metrics: {timestamp} }

      const newPost =  await this.createPostUseCase.createPost(userId, postData)
      
      res.json({ message: 'Post created successfully', postData: newPost })
    } catch (error) {
      return next(error)
    }
  }
}
