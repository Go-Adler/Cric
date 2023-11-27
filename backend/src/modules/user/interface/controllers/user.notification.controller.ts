import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from 'jsonwebtoken'

import { NotificationUseCase } from "../../application/useCases/user.notification.useCase"
import { GetAwsUrlUseCase } from "../../application/useCases/user.getAwsUrl.useCase"
import { NotificationMarkAsReadResponse } from '../../../../shared/interfaces/user.notification.interface'

export class NotificationController {
  private notificationUseCase: NotificationUseCase
  private getAwsUrlUseCase: GetAwsUrlUseCase

  constructor() {
    this.notificationUseCase = new NotificationUseCase()
    this.getAwsUrlUseCase = new GetAwsUrlUseCase()
  }

  getNotifications = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload
    try {
      let notifications = await this.notificationUseCase.getNotifications(userId)
      await this.getAwsUrlUseCase.getNotificationsWithProfileUrl(notifications)
      res.json({ notifications })
    } catch (e: any) {
      console.log(`Error in get notification, user data controller: ${e.message}`)
      return next(e)
    }
  }

  markAsRead = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload
    const { notificationId } = req.body as { notificationId: string }
    try {
      const updatedNotification = await this.notificationUseCase.markAsRead(userId, notificationId)
      res.json({ success: true, message: "Notification marked as read successfully", updatedNotification })
    } catch (e: any) {
      console.log(`Error in get notification, user data controller: ${e.message}`)
      return next(e)
    }
  }
}
