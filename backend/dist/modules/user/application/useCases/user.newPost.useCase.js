"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostUseCase = void 0;
const user_post_dataAccess_1 = require("../../data/user.post.dataAccess");
class CreatePostUseCase {
    constructor() {
        this.createPost = async (userId, postData) => {
            const post = await this.userPostDataAccess.createPost(userId, postData);
            return post;
        };
        this.userPostDataAccess = new user_post_dataAccess_1.UserPostDataAccess();
    }
}
exports.CreatePostUseCase = CreatePostUseCase;
