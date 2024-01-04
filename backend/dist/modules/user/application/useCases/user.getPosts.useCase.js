"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserPostsUseCase = void 0;
const user_post_dataAccess_1 = require("../../data/user.post.dataAccess");
class GetUserPostsUseCase {
    constructor() {
        this.getUserPosts = async (userId, skip) => {
            const posts = await this.userPostDataAccess.getUserPosts(userId, skip);
            return posts;
        };
        this.getFeedPosts = async (userId, skip) => {
            const posts = await this.userPostDataAccess.getFeedPosts(userId, skip);
            return posts;
        };
        this.getUserPost = async (postId) => {
            return await this.userPostDataAccess.getUserPost(postId);
        };
        this.userPostDataAccess = new user_post_dataAccess_1.UserPostDataAccess();
    }
}
exports.GetUserPostsUseCase = GetUserPostsUseCase;
