"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostActionsUseCase = void 0;
class PostActionsUseCase {
    constructor() {
        this.likedPosts = (userId, posts) => {
            for (const post of posts) {
                const isLiked = (userId, usersLiked) => {
                    return usersLiked.some(function (element) {
                        return element.equals(userId);
                    });
                };
                const usersLiked = post.usersLiked;
                if (post.engagement && isLiked(userId, usersLiked)) {
                    post.engagement.liked = true;
                }
            }
            return posts;
        };
    }
}
exports.PostActionsUseCase = PostActionsUseCase;
