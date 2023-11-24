import { Request, Response, NextFunction } from "express"

import { JwtPayload } from "jsonwebtoken"
import { GetUserDataUseCase } from "../../application/useCases/user.getData.useCase"
import { GetAwsUrlUseCase } from "../../application/useCases/user.getAwsUrl.useCase"
import { NotificationUseCase } from "../../application/useCases/user.notification.useCase"

export class UserDataController {
  private userDataUseCase: GetUserDataUseCase
  private getAwsUrlUseCase: GetAwsUrlUseCase
  private notificationUseCase: NotificationUseCase

  constructor() {
    this.userDataUseCase = new GetUserDataUseCase()
    this.getAwsUrlUseCase = new GetAwsUrlUseCase()
    this.notificationUseCase = new NotificationUseCase()
  }

  userBasicInfo = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload
    try {
      let profilePicture = await this.userDataUseCase.getProfilePicture(userId)
      profilePicture = await this.getAwsUrlUseCase.getImageUrl(profilePicture)
      const userName = await this.userDataUseCase.getUserName(userId)
      const friendsCount = await this.userDataUseCase.getFriendsCount(userId)
      const name = await this.userDataUseCase.getName(userId)
      const notificationsCount = await this.userDataUseCase.getNotificationsCount(userId)

      res.json({
        profilePicture,
        name,
        userName,
        friendsCount,
        notificationsCount
      })
    } catch (error) {
      return next(error)
    }
  }

  friendBasicInfo = async (req: Request, res: Response, next: NextFunction) => {
    const { userName } = req.params
    try {
      const userId = await this.userDataUseCase.getUserId(userName)
      
      let profilePicture = await this.userDataUseCase.getProfilePicture(userId)
      
      if (profilePicture) profilePicture = await this.getAwsUrlUseCase.getImageUrl(profilePicture) 
      const friendsCount = await this.userDataUseCase.getFriendsCount(userId)
      const name = await this.userDataUseCase.getName(userId)
      res.json({
        profilePicture,
        name,
        userName,
        friendsCount,
      })
    } catch (error) {
      return next(error)
    }
  }

  getNotifications = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload
    try {
      const notifications = await this.notificationUseCase.getNotifications(userId)
      res.json({notifications})
    } catch (e: any) {
      console.log(`Error in get notification, user data controller: ${e.message}`);
      return next(e)
    }
    
  }
}
