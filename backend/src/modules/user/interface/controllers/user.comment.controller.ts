import { Request, Response, NextFunction } from 'express'
import { CommentPostUseCase } from '../../application/useCases/user.commentPost.useCase'
import { AwsUploadUseCase } from '../../application/useCases/user.awsUpload.useCase'
import { JwtPayload } from 'jsonwebtoken'
import { ImageValidationUseCase } from '../../application/useCases/user.imageValidation.useCase'
import { GetAwsUrlUseCase } from '../../application/useCases/user.getAwsUrl.useCase'
import { Post } from '../../../../shared/interfaces/userPost.interface'
import { PostActionsUseCase } from '../../application/useCases/user.postActionsCheck.useCase'

// Define the controller class for user new comment
export class CommentController {
  private commentPostUseCase: CommentPostUseCase
  private imageValidationUseCase: ImageValidationUseCase
  private awsUploadUseCase: AwsUploadUseCase
  private getAwsUrlUseCase: GetAwsUrlUseCase
  private postActionsUseCase: PostActionsUseCase

  constructor() {
    this.commentPostUseCase = new CommentPostUseCase()
    this.imageValidationUseCase = new ImageValidationUseCase()
    this.awsUploadUseCase = new AwsUploadUseCase()
    this.getAwsUrlUseCase = new GetAwsUrlUseCase()
    this.postActionsUseCase = new PostActionsUseCase()
  }

  // Define the method for comment
  comment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Get the user id and the text from the request
      const { userId } = req.user as JwtPayload
      const { postId } = req.body as { postId: any }
      const { text } = req.body as { text: string }
        console.log(postId, 31);
        
        console.log(req.body, 33);
        
      

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
      const postData: Post = { userId, content: { text, multimedia: [multimedia] } }

      // Create the post without url using the use case
      const postWithoutUrl = await this.commentPostUseCase.createComment(postId, postData)

      // Get the post with url using the use case
      const post = await this.getAwsUrlUseCase.getUrl(postWithoutUrl)

      // Send the post as response to the client
      res.json({ post })
    } catch (error) {
      // Pass the error to the next middleware
      next(error)
    }
  }

  
  getComments = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload
    const { skip, postId } = req.body
    try {
      
      const postsWithoutUrl = await this.commentPostUseCase.getComments(postId, skip)
      let posts = await this.getAwsUrlUseCase.getPostsWithUrl(postsWithoutUrl)
      const comments = this.postActionsUseCase.likedPosts(userId, posts)
      res.json({comments})
    } catch (error) {
      return next(error)
    }
  }
}
