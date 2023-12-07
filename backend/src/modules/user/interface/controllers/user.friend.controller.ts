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
   * Method to add friend request
   * 
   * @param req Express request object containing username and JWT payload with user ID.
   * @param res Express response object to send success message.
   * @param next Express next function for error handling.
   */
  addFriend = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId } = req.user as JwtPayload // Extract user ID from JWT payload
      const { personId } = req.body
      await this.friendUseCase.addRequest(userId, personId)
      await this.notificationUseCase.addNotification(personId, 'requestReceived', userId)
      await this.socketService.sendNotification(personId)
      res.json({ message: 'Request successful', friendStatus: 'requestSent' })
    } catch(error) {
      next(error)
    }
  }

  /**
 * Method to accept user as friend
 * 
 * @param req Express request object containing username and JWT payload with user ID.
 * @param res Express response object to send success message.
 * @param next Express next function for error handling.
 */
  acceptFriend = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId } = req.user as JwtPayload // Extract user ID from JWT payload
      const { personId } = req.body

      await this.friendUseCase.acceptRequest(userId, personId)
      await this.notificationUseCase.addNotification(personId, 'requestReceived', userId)
      await this.socketService.sendNotification(personId)
      res.json({ message: 'Request successful', friendStatus: 'friend' })
    } catch(error) {
      next(error)
    }
  }

  /**
 * Method to reject user as friend
 * 
 * @param req Express request object containing username and JWT payload with user ID.
 * @param res Express response object to send success message.
 * @param next Express next function for error handling.
 */
  rejectFriend = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId } = req.user as JwtPayload // Extract user ID from JWT payload
      const { personId } = req.body

      await this.friendUseCase.rejectRequest(userId, personId)
      await this.notificationUseCase.addNotification(personId, 'requestReceived', userId)
      await this.socketService.sendNotification(personId)
      res.json({ message: 'Request successful', friendStatus: 'stranger' })
    } catch(error) {
      next(error)
    }
  }

  /**
 * Method to reject user as friend
 * 
 * @param req Express request object containing username and JWT payload with user ID.
 * @param res Express response object to send success message.
 * @param next Express next function for error handling.
 */
  removeFriend = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId } = req.user as JwtPayload // Extract user ID from JWT payload
      const { personId } = req.body

      await this.friendUseCase.removeFriend(userId, personId)
      await this.notificationUseCase.addNotification(personId, 'r', userId)
      await this.socketService.sendNotification(personId)
      res.json({ message: 'Request successful', friendStatus: 'stranger' })
    } catch(error) {
      next(error)
    }
  }
} 