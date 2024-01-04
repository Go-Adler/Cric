import { Request, Response, NextFunction } from "express"
import { UserProfileUseCase } from "../../application/useCases/user.profile.userCase"
import { AwsUploadUseCase } from "../../application/useCases/user.awsUpload.useCase"
import { JwtPayload } from "jsonwebtoken"
import { ImageValidationUseCase } from "../../application/useCases/user.imageValidation.useCase"
import { GetAwsUrlUseCase } from "../../application/useCases/user.getAwsUrl.useCase"
import { GetUserDataUseCase } from "../../application/useCases/user.getData.useCase"
import { SendOTP_UseCase } from "../../application/useCases/user.sendOTP.useCase"
import { UserExistingUseCase } from "../../application/useCases/user.existing.useCase"
import { CreateUserUseCase } from "../../application/useCases/user.createUser.useCase"

// Define the controller class for user new post
export class UserProfileController {
  // Declare the private fields for the use cases
  private userProfileUseCase: UserProfileUseCase
  private userDataUseCase: GetUserDataUseCase
  private imageValidationUseCase: ImageValidationUseCase
  private awsUploadUseCase: AwsUploadUseCase
  private sendOTP_UseCase: SendOTP_UseCase
  private getAwsUrlUseCase: GetAwsUrlUseCase
  private createUserUseCase: CreateUserUseCase
  private userExistingUseCase: UserExistingUseCase

  // Initialize the fields in the constructor
  constructor() {
    this.userExistingUseCase = new UserExistingUseCase()
    this.userProfileUseCase = new UserProfileUseCase()
    this.userDataUseCase = new GetUserDataUseCase()
    this.sendOTP_UseCase = new SendOTP_UseCase()
    this.imageValidationUseCase = new ImageValidationUseCase()
    this.awsUploadUseCase = new AwsUploadUseCase()
    this.getAwsUrlUseCase = new GetAwsUrlUseCase()
    this.createUserUseCase = new CreateUserUseCase()
  }

  // Define the method for user new post
  updateProfilePicture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Get the user id and the text from the request
      const { userId } = req.user as JwtPayload

      // Get the image file from the request
      const imageFile = req.file

      // Initialize the multimedia field
      let profilePicture: string = ""

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

  // Define the method for user new post
  updateUserInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Get the user id and the text from the request
      const { userId } = req.user as JwtPayload

      const { userName, phone, email } = req.body
      
      const emailStored = this.userDataUseCase.getEmail(userId)
      const userNameStored = this.userDataUseCase.getUserName(userId)
      const phoneStored = this.userDataUseCase.getPhone(userId)

      // Ensure email is in lowercase for consistency
      const userData = { ...req.body, email: email.toLowerCase(), userName: userName.toLowerCase() }

      // Check if the user already exists
      await this.userExistingUseCase.userExisting(userName, phone, email)

      if (emailStored !== email) {
        await this.createUserUseCase.editEmail(userId, email)
        await this.sendOTP_UseCase.sendOTP(email)
      }

      if (userNameStored !== userData) {
        await this.createUserUseCase.ed
      }

      // Create the user
      await this.createUserUseCase.editUserName(userId, userData)

      // Send OTP to the user's email

      res.status(200).json({ message: "User update successful" })

      // Send the post as response to the client
    } catch (error) {
      // Pass the error to the next middleware
      next(error)
    }
  }
}
