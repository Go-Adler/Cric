import { Request, Response, NextFunction } from 'express'
import { CreatePostUseCase } from '../../application/useCases/user.newPost.useCase'
import { AwsUploadUseCase } from '../../application/useCases/user.awsUpload.useCase'
import { JwtPayload } from 'jsonwebtoken'
import { ImageValidationUseCase } from '../../application/useCases/user.imageValidation.useCase'
import { GetAwsUrlUseCase } from '../../application/useCases/user.getAwsUrl.useCase'
import { Post } from '../../../../shared/interfaces/userPost.interface'

// Define the controller class for user new post
export class UserNewPostController {
  // Declare the private fields for the use cases
  private createPostUseCase: CreatePostUseCase
  private imageValidationUseCase: ImageValidationUseCase
  private awsUploadUseCase: AwsUploadUseCase
  private getAwsUrlUseCase: GetAwsUrlUseCase

  // Initialize the fields in the constructor
  constructor() {
    this.createPostUseCase = new CreatePostUseCase()
    this.imageValidationUseCase = new ImageValidationUseCase()
    this.awsUploadUseCase = new AwsUploadUseCase()
    this.getAwsUrlUseCase = new GetAwsUrlUseCase()
  }

  // Define the method for user new post
  userNewPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Get the user id and the text from the request
      const { userId } = req.user as JwtPayload
      const { text } = req.body as { text: string }

      // Get the image file from the request
      const imageFile = req.file

      // Initialize the multimedia field
      let multimedia = ''

      // If image exists, validate and upload it
      if (imageFile) {
        // Validate the image using the use case
        const isImageValid = await this.imageValidationUseCase.validateImage(imageFile)

        // If image is invalid, send error response
        if (!isImageValid.valid) {
          res.json({ uploadFailed: true, message: isImageValid.reason })
          return
        }

        // Upload the image to aws bucket using the use case
        const uploadInfo = await this.awsUploadUseCase.uploadPost(userId, imageFile)

        // If upload failed, send error response
        if (!uploadInfo) {
          res.json({ uploadFailed: true })
          return
        }

        // Set the multimedia field to the file name
        multimedia = uploadInfo
      }
      
      // Create and send the post
      const postData = { userId, content: { text, multimedia: [multimedia] } } as Post

      // Create the post without url using the use case
      const postWithoutUrl = await this.createPostUseCase.createPost(userId, postData)

      // Get the post with url using the use case
      const post = await this.getAwsUrlUseCase.getUrl(postWithoutUrl)

      // Send the post as response to the client
      res.json({ post })
    } catch (error) {
      // Pass the error to the next middleware
      next(error)
    }
  }
}
