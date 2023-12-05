import { Request, Response, NextFunction } from "express"
import { JwtPayload } from "jsonwebtoken"
import { UserFriendUseCase } from "../../application/useCases/user.friend.useCase"

export class FriendController {
  private friendUseCase: UserFriendUseCase
  constructor() {
    this.friendUseCase = new UserFriendUseCase()
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
      await this.friendUseCase.addFriend(userId, personId)
      
      res.json({ message: 'Successfully added as friend' })
    } catch(error) {
      next(error)
    }
  }
} 