import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Post } from "../../../../shared/interfaces/userPost.interface";
import { CommentPostUseCase } from "../../application/useCases/user.commentPost.useCase";
import { ImageValidationUseCase } from "../../application/useCases/user.imageValidation.useCase"
import { AwsUploadUseCase } from "../../application/useCases/user.awsUpload.useCase"
import { GetAwsUrlUseCase } from "../../application/useCases/user.getAwsUrl.useCase"
import { PostActionsUseCase } from "../../application/useCases/user.postActionsCheck.useCase"

/**
 * Controller class for handling user comments.
 */
export class CommentController {
  private commentPostUseCase: CommentPostUseCase;
  private imageValidationUseCase: ImageValidationUseCase;
  private awsUploadUseCase: AwsUploadUseCase;
  private getAwsUrlUseCase: GetAwsUrlUseCase;
  private postActionsUseCase: PostActionsUseCase;

  constructor() {
    // Initialize use cases
    this.commentPostUseCase = new CommentPostUseCase();
    this.imageValidationUseCase = new ImageValidationUseCase();
    this.awsUploadUseCase = new AwsUploadUseCase();
    this.getAwsUrlUseCase = new GetAwsUrlUseCase();
    this.postActionsUseCase = new PostActionsUseCase();
  }

  /**
   * Handle the request for posting a comment.
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function
   * @returns {Promise<void>}
   */
  comment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId } = req.user as JwtPayload;
      const { postId, text } = req.body;
      const imageFile = req.file;

      let multimedia = "";

      if (imageFile) {
        const isImageValid = await this.imageValidationUseCase.validateImage(imageFile);

        if (!isImageValid.valid) {
          res.json({ uploadFailed: true, message: isImageValid.reason });
          return;
        }

        const uploadInfo = await this.awsUploadUseCase.uploadPost(userId, imageFile);

        if (!uploadInfo) {
          res.json({ uploadFailed: true });
          return;
        }

        multimedia = uploadInfo;
      }

      const postData = { userId, content: { text, multimedia: [multimedia] } } as Post

      const postWithoutUrl = await this.commentPostUseCase.createComment(postId, postData);

      const post = await this.getAwsUrlUseCase.getUrl(postWithoutUrl);

      res.json({ post });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Handle the request for getting comments.
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function
   * @returns {Promise<void>}
   */
  getComments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId } = req.user as JwtPayload;
      const { skip, postId } = req.body;

      const postsWithoutUrl = await this.commentPostUseCase.getComments(postId, skip);

      let posts = await this.getAwsUrlUseCase.getPostsWithUrl(postsWithoutUrl);

      const comments = this.postActionsUseCase.likedPosts(userId, posts);

      res.json({ comments });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Handle the request for liking a comment.
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function
   * @returns {Promise<void>}
   */
  likeComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId } = req.user as JwtPayload;
      const { postId } = req.body;

      await this.commentPostUseCase.likeComment(userId, postId);

      res.json({ message: "Successfully liked the comment" });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Handle the request for unliking a comment.
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function
   * @returns {Promise<void>}
   */
  unlikeComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId } = req.user as JwtPayload;
      const { postId } = req.body;

      await this.commentPostUseCase.unlikeComment(userId, postId);

      res.json({ message: "Successfully unliked the comment" });
    } catch (error) {
      next(error);
    }
  };
}
