import { Request, Response, NextFunction } from 'express'
import { UserProfileUseCase } from '../../application/useCases/user.profile.userCase'
import { AwsUploadUseCase } from '../../application/useCases/user.awsUpload.useCase'
import { JwtPayload } from 'jsonwebtoken'
import { ImageValidationUseCase } from '../../application/useCases/user.imageValidation.useCase'
import { GetAwsUrlUseCase } from '../../application/useCases/user.getAwsUrl.useCase'

// Define the controller class for user new post
export class UserProfileController {
  // Declare the private fields for the use cases
  private userProfileUseCase: UserProfileUseCase
  private imageValidationUseCase: ImageValidationUseCase
  private awsUploadUseCase: AwsUploadUseCase
  private getAwsUrlUseCase: GetAwsUrlUseCase

  // Initialize the fields in the constructor
  constructor() {
    this.userProfileUseCase = new UserProfileUseCase()
    this.imageValidationUseCase = new ImageValidationUseCase()
    this.awsUploadUseCase = new AwsUploadUseCase()
    this.getAwsUrlUseCase = new GetAwsUrlUseCase()
  }

  // Define the method for user new post
  updateProfilePicture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Get the user id and the text from the request
      const { userId } = req.user as JwtPayload

      // Get the image file from the request
      const imageFile = req.file

      // Initialize the multimedia field
      let profilePicture: string = ''

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
        const uploadInfo = await this.awsUploadUseCase.uploadProfilePicture(userId, imageFile)

        // If upload failed, send error response
        if (!uploadInfo) {
          res.json({ uploadFailed: true })
          return
        }

        // Set the multimedia field to the file name
        profilePicture = uploadInfo
      }
      
      // Create the post without url using the use case
      await this.userProfileUseCase.updateProfilePicture(userId, profilePicture)
      profilePicture = await this.getAwsUrlUseCase.getImageUrl(profilePicture)

      // Send the post as response to the client
      res.json({ profilePicture })
    } catch (error) {
      // Pass the error to the next middleware
      next(error)
    }
  }
}
