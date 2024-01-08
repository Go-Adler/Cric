import { Request, Response, NextFunction } from "express"
import { Types } from 'mongoose'

import { JwtPayload } from "jsonwebtoken"
import { MessageUseCase } from "../../application/useCases/user.message.useCase"
import { GetUserDataUseCase } from "../../application/useCases/user.getData.useCase"
import { GetAwsUrlUseCase } from "../../application/useCases/user.getAwsUrl.useCase"
import { NotificationUseCase } from "../../application/useCases/user.notification.useCase"
import { UserBasicInfoResponse } from "../../../../shared/interfaces/userDataResponse.interface"
import { PersonBasicInfoResponse } from "../../../../shared/interfaces/personDataResponse.interface"

export class UserDataController {
  private messageUseCase: MessageUseCase
  private getAwsUrlUseCase: GetAwsUrlUseCase
  private userDataUseCase: GetUserDataUseCase
  private notificationUseCase: NotificationUseCase

  constructor() {
    this.messageUseCase = new MessageUseCase()
    this.getAwsUrlUseCase = new GetAwsUrlUseCase()
    this.userDataUseCase = new GetUserDataUseCase()
    this.notificationUseCase = new NotificationUseCase()
  }

  /**
   * Retrieves basic user information for the currently logged-in user.
   *
   * @param req Express request object containing the JWT payload with user ID.
   * @param res Express response object to send user data.
   * @param next Express next function for error handling.
   */
  userBasicInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let { userId } = req.user as JwtPayload // Extract user ID from JWT payload
      userId = new Types.ObjectId(userId)

      let profilePicture = ''
      
      // Fetch user data using use cases
      const { friendsCount, name, userName, profilePicture: profilePictureWithOutUrl,email, phone } = await this.userDataUseCase.getBasicInfo(userId)
      const notificationsCount = await this.notificationUseCase.getNotificationsCount(userId)
      const messageCount  = await this.messageUseCase.getMessageCount(userId)

      // Generate pre-signed URL for profile picture if available
      if (profilePictureWithOutUrl) {
        profilePicture = await this.getAwsUrlUseCase.getImageUrl(profilePictureWithOutUrl)
      }

      // Build and send user data response
      const userData: UserBasicInfoResponse = {
        name,
        email,
        phone,
        userName,
        messageCount,
        friendsCount,
        profilePicture,
        notificationsCount,
      }

      res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Retrieves basic information about a friend by username.
   *
   * @param req Express request object containing username and JWT payload with user ID.
   * @param res Express response object to send friend data.
   * @param next Express next function for error handling.
   */
  friendBasicInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userName } = req.params // Get username from request parameters
      const { userId } = req.user as JwtPayload // Extract user ID from JWT payload
      
      // Get friend's user ID from username
      const personId = await this.userDataUseCase.getUserId(userName)

      // Fetch friend data using use cases
      const name = await this.userDataUseCase.getName(personId)
      const isOnline = await this.userDataUseCase.isOnline(personId)
      const friendsCount = await this.userDataUseCase.getFriendsCount(personId)
      const friendStatus = await this.userDataUseCase.isFriend(personId, userId)
      let profilePicture = await this.userDataUseCase.getProfilePicture(personId)
      // Generate pre-signed URL for profile picture if available
      if (profilePicture) {
        profilePicture = await this.getAwsUrlUseCase.getImageUrl(profilePicture)
      }

      // Build and send friend data response
      const friendData: PersonBasicInfoResponse = {
        name,
        personId,
        isOnline,
        friendStatus,
        friendsCount,
        profilePicture,
      }

      res.json(friendData)
    } catch (error) {
      next(error)
    }
  }
}
