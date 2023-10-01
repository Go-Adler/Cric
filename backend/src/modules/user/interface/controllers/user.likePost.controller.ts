// Importing required modules
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { LikePostUseCase } from "../../application/useCases/user.likePost.useCase";

// Controller class for liking a post
export class PostLikeController {
  private likePostUseCase: LikePostUseCase;

  constructor() {
    this.likePostUseCase = new LikePostUseCase()
  }

  // Method to handle the request for liking a post
  likePost = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload;
    const { postId } = req.body;
    try {
      await this.likePostUseCase.likePost(userId, postId);

      // Send a response back to indicate success
      return res.status(200).json({ message: 'Successfully liked the post' });
    } catch (error) {
      return next(error);
    }
  }
}
