import { Request, Response, NextFunction } from 'express'

import { CreatePostUseCase } from '../../application/useCases/user.newPost.useCase'
import { UserPostDataAccess } from '../../data/user.postDataAccess'
import { AwsUploadUseCase } from '../../application/useCases/user.awsUpload.userCase' 
import { JwtPayload } from 'jsonwebtoken'

export class UserNewPostController {
  private createPostUseCase: CreatePostUseCase
  private userPostDataAccess: UserPostDataAccess
  private awsUploadUseCase: AwsUploadUseCase

  constructor() {
    this.createPostUseCase = new CreatePostUseCase()
    this.userPostDataAccess = new UserPostDataAccess()
    this.awsUploadUseCase = new AwsUploadUseCase()
  }

  userNewPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.user as JwtPayload
      const imageFile = req.file
      const isUploaded = await this.awsUploadUseCase.uploadPost(userId, imageFile)

      if (!isUploaded) res.json({uploadFailed: true})
      res.json({uploadSuccess: true, uploadFailed: true})
    } catch (error) {
      return next(error)
    }
  }
}