import { Request, Response, NextFunction } from "express"
import { JwtPayload } from "jsonwebtoken"
import { UserFriendUseCase } from "../../application/useCases/user.friend.useCase"
import { SocketService } from "../../../../services/socketService"

export class FriendController {
  private friendUseCase: UserFriendUseCase
  private socketService: SocketService

  constructor() {
    this.friendUseCase = new UserFriendUseCase()
    this.socketService = SocketService.getInstance()
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
      await this.friendUseCase.addRequest(userId, personId)
      await this.socketService.sendNotification(personId)
      res.json({ message: 'Request successful', friendStatus: 'requestSent' })
    } catch(error) {
      next(error)
    }
  }
} 