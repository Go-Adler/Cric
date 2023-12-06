import { Request, Response, NextFunction } from "express"

import { JwtPayload } from "jsonwebtoken"
import { GetUserDataUseCase } from "../../application/useCases/user.getData.useCase"
import { GetAwsUrlUseCase } from "../../application/useCases/user.getAwsUrl.useCase"
import { NotificationUseCase } from "../../application/useCases/user.notification.useCase"
import { UserDataResponse } from "../../../../shared/interfaces/userFriendDataResponse.interface"

export class UserDataController {
  private getAwsUrlUseCase: GetAwsUrlUseCase
  private userDataUseCase: GetUserDataUseCase
  private notificationUseCase: NotificationUseCase

  constructor() {
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
      const { userId } = req.user as JwtPayload // Extract user ID from JWT payload

      // Fetch user data using use cases
      const name = await this.userDataUseCase.getName(userId)
      const userName = await this.userDataUseCase.getUserName(userId)
      let profilePicture = await this.userDataUseCase.getProfilePicture(userId)

      // Get friend count and notification count
      const friendsCount = await this.userDataUseCase.getFriendsCount(userId)
      const notificationsCount = await this.notificationUseCase.getNotificationsCount(userId)

      // Generate pre-signed URL for profile picture if available
      if (profilePicture) {
        profilePicture = await this.getAwsUrlUseCase.getImageUrl(profilePicture)
      }

      // Build and send user data response
      const userData: UserDataResponse = {
        name,
        userName,
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
      const isFriend = await this.userDataUseCase.isFriend(personId, userId)
      const friendsCount = await this.userDataUseCase.getFriendsCount(personId)
      let profilePicture = await this.userDataUseCase.getProfilePicture(personId)

      // Generate pre-signed URL for profile picture if available
      if (profilePicture) {
        profilePicture = await this.getAwsUrlUseCase.getImageUrl(profilePicture)
      }

      // Build and send friend data response
      const friendData: UserDataResponse = {
        name,
        isFriend,
        userName,
        friendsCount,
        profilePicture,
      }

      res.json(friendData)
    } catch (error) {
      next(error)
    }
  }
}
