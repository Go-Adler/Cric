import { Types } from 'mongoose';

import { UserPostDataAccess } from '../../data/user.postDataAccess';

// Class to handle the use case of liking a post
export class LikePostUseCase {
  private userPostDataAccess: UserPostDataAccess;

  constructor() {
    this.userPostDataAccess = new UserPostDataAccess()
  }

  /**
   * Method to like a post.
   *
   * @param userId - The ID of the user who likes the post.
   * @param postId - The ID of the post to be liked.
   * @throws Error if there's an issue while liking the post.
   */
  async likePost(userId: Types.ObjectId, postId: Types.ObjectId): Promise<void> {
    try {
      await this.userPostDataAccess.likePost(userId, postId);
    } catch (error) {
      console.error(`Error occurred while liking the post: ${error}`);
      throw error;
    }
  }
}
