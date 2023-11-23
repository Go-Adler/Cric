// Importing required modules
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

import { PostLikeRequestBody } from "../../../../shared/interfaces/user.interface";
import { LikePostUseCase } from "../../application/useCases/user.likePost.useCase";
import { UserDataUseCase } from "../../application/useCases/user.data.useCase"
import { SocketService } from "../../../../services/socketService"
import { NotificationUseCase } from "../../application/useCases/user.notification.useCase"

/**
 * Controller class for liking and unliking a post
 */
export class PostLikeController {
  private likePostUseCase: LikePostUseCase
  private userDataUseCase: UserDataUseCase
  private notificationUseCase: NotificationUseCase
  private socketService: SocketService

  constructor() {
    this.likePostUseCase = new LikePostUseCase();
    this.userDataUseCase = new UserDataUseCase()
    this.notificationUseCase = new NotificationUseCase()
    this.socketService = SocketService.getInstance()
  }

  /**
   * Method to handle the request for liking a post
   * @param req - The request object
   * @param res - The response object
   * @param next - The next middleware function in the stack
   */
  likePost = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload;
    const { postId } = req.body as PostLikeRequestBody;

    // Validate inputs
    if (!userId || !postId) {
      return res.status(400).json({ message: "Invalid inputs" });
    }

    try {
      await this.likePostUseCase.likePost(userId, postId);

      // Returns false or if user is present the user id
      const isDifferentUser =  await this.userDataUseCase.checkSameUser(postId, userId)

      if (isDifferentUser) {
        // adding notification to user
        this.notificationUseCase.addNotification(userId, 'like', postId)

        // sending user id getting from checking the user
        this.socketService.sendNotification(isDifferentUser)
      }
      // Send a response back to indicate success
      return res.status(200).json({ message: "Successfully liked the post" });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  };

  /**
   * Method to handle the request for unliking a post
   * @param req - The request object
   * @param res - The response object
   * @param next - The next middleware function in the stack
   */
  unlikePost = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload;
    const { postId } = req.body as PostLikeRequestBody;

    // Validate inputs
    if (!userId || !postId) {
      return res.status(400).json({ message: "Invalid inputs" });
    }

    try {
      await this.likePostUseCase.unlikePost(userId, postId);

      // Send a response back to indicate success
      return res.status(200).json({ message: "Successfully unliked the post" });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  };
}
