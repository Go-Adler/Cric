"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikePostUseCase = void 0;
const user_post_dataAccess_1 = require("../../data/user.post.dataAccess");
// Class to handle the use case of liking a post
class LikePostUseCase {
    constructor() {
        this.userPostDataAccess = new user_post_dataAccess_1.UserPostDataAccess();
    }
    /**
     * Method to like a post.
     *
     * @param userId - The ID of the user who likes the post.
     * @param postId - The ID of the post to be liked.
     * @throws Error if there's an issue while liking the post.
     */
    async likePost(userId, postId) {
        try {
            await this.userPostDataAccess.likePost(userId, postId);
        }
        catch (error) {
            console.error(`Error occurred while liking the post: ${error}`);
            throw error;
        }
    }
    /**
   * Method to unlike a post.
   *
   * @param userId - The ID of the user who unlikes the post.
   * @param postId - The ID of the post to be lunliked.
   * @throws Error if there's an issue while unliking the post.
   */
    async unlikePost(userId, postId) {
        try {
            await this.userPostDataAccess.unlikePost(userId, postId);
        }
        catch (error) {
            console.error(`Error occurred while unliking the post: ${error}`);
            throw error;
        }
    }
}
exports.LikePostUseCase = LikePostUseCase;
