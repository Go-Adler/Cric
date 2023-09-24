import { Request, Response, NextFunction } from 'express'

import { CreatePostUseCase } from '../../application/useCases/user.newPost.useCase'
import { UserPostDataAccess } from '../../data/user.postDataAccess'
import { AwsUploadUseCase } from '../../application/useCases/user.awsUpload.userCase'
import { JwtPayload } from 'jsonwebtoken'
import { ImageValidationUseCase } from '../../application/useCases/user.imageValidation.useCase'

export class UserNewPostController {
  private createPostUseCase: CreatePostUseCase
  private userPostDataAccess: UserPostDataAccess
  private imageValidationUseCase: ImageValidationUseCase
  private awsUploadUseCase: AwsUploadUseCase

  constructor() {
    this.createPostUseCase = new CreatePostUseCase()
    this.userPostDataAccess = new UserPostDataAccess()
    this.imageValidationUseCase = new ImageValidationUseCase()
    this.awsUploadUseCase = new AwsUploadUseCase()
  }

  userNewPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.user as JwtPayload
      const imageFile = req.file
      const { text } = req.body as { text: string }
      
      let multimedia = ''


      if (imageFile) {
        const isImageValid = await this.imageValidationUseCase.validateImage(imageFile)
        if(!isImageValid.valid) return res.json({uploadFailed: true, message: isImageValid.reason})
        // return false if failes and file name if uploaded
        const uploadInfo = await this.awsUploadUseCase.uploadPost(
          userId,
          imageFile
        )

        if (!uploadInfo) return res.json({ uploadFailed: true })
        multimedia = uploadInfo
      }
      
      const postData = { content: {text, multimedia:[multimedia]} }

      const post = await this.createPostUseCase.createPost(userId, postData)

      res.json({ post })
    } catch (error) {
      return next(error)
    }
  }
}
