import { Request, Response, NextFunction } from "express"
import { JwtPayload } from "jsonwebtoken"

import { SocketService } from "../../../../services/socketService"
import { UserFriendUseCase } from "../../application/useCases/user.friend.useCase"
import { NotificationUseCase } from "../../application/useCases/user.notification.useCase"

export class FriendController {
  private socketService: SocketService
  private friendUseCase: UserFriendUseCase
  private notificationUseCase: NotificationUseCase

  constructor() {
    this.friendUseCase = new UserFriendUseCase()
    this.socketService = SocketService.getInstance()
    this.notificationUseCase = new NotificationUseCase()
  }
  
  /**
   * Add a user as friend
   * 
   * @param req Express request object containing username and JWT payload with user ID.
   * @param res Express response object to send success message.
   * @param next Express next function for error handling.
   */
  addFriend = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId } = req.user as JwtPayload // Extract user ID from JWT payload
      const { personId } = req.body
      console.log(31);
      await this.friendUseCase.addRequest(userId, personId)
      console.log(31);
      
      await this.notificationUseCase.addNotification(personId, 'requestReceived', userId)
      await this.socketService.sendNotification(personId)
      res.json({ message: 'Request successful', friendStatus: 'requestSent' })
    } catch(error) {
      next(error)
    }
  }
} 