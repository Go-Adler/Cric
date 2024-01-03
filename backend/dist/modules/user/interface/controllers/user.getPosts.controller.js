"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserPostsController = void 0;
const mongoose_1 = require("mongoose");
const user_getPosts_useCase_1 = require("../../application/useCases/user.getPosts.useCase");
const user_getAwsUrl_useCase_1 = require("../../application/useCases/user.getAwsUrl.useCase");
const user_postActionsCheck_useCase_1 = require("../../application/useCases/user.postActionsCheck.useCase");
const user_getData_useCase_1 = require("../../application/useCases/user.getData.useCase");
class GetUserPostsController {
    constructor() {
        this.getUserPosts = async (req, res, next) => {
            const { userId } = req.user;
            const { skip } = req.body;
            try {
                const postsWithoutUrl = await this.getUserPostsUseCase.getUserPosts(userId, skip);
                let posts = await this.getAwsUrlUseCase.getPostsWithUrl(postsWithoutUrl);
                posts = this.postActionsUseCase.likedPosts(userId, posts);
                res.json({ posts });
            }
            catch (error) {
                return next(error);
            }
        };
        this.getFeedPosts = async (req, res, next) => {
            const { userId } = req.user;
            const { skip } = req.body;
            try {
                const postsWithoutUrl = await this.getUserPostsUseCase.getFeedPosts(userId, skip);
                let posts = await this.getAwsUrlUseCase.getFeedPostsWithUrl(postsWithoutUrl);
                posts = this.postActionsUseCase.likedPosts(userId, posts);
                res.json({ posts });
            }
            catch (error) {
                return next(error);
            }
        };
        this.getFriendsPosts = async (req, res, next) => {
            const { skip, userName } = req.body;
            const { userId } = req.user;
            try {
                const friendId = await this.getDataUseCase.getUserId(userName);
                const postsWithoutUrl = await this.getUserPostsUseCase.getUserPosts(friendId, skip);
                let posts = await this.getAwsUrlUseCase.getPostsWithUrl(postsWithoutUrl);
                posts = this.postActionsUseCase.likedPosts(userId, posts);
                res.json({ posts });
            }
            catch (error) {
                return next(error);
            }
        };
        this.getPost = async (req, res, next) => {
            try {
                const { id } = req.params;
                const postId = new mongoose_1.Types.ObjectId(id);
                let postResponse = await this.getUserPostsUseCase.getUserPost(postId);
                postResponse = await this.getAwsUrlUseCase.getPostWithUrl(postResponse);
                return res.json(postResponse);
            }
            catch (error) {
                return next(error);
            }
        };
        this.getUserPostsUseCase = new user_getPosts_useCase_1.GetUserPostsUseCase();
        this.getAwsUrlUseCase = new user_getAwsUrl_useCase_1.GetAwsUrlUseCase();
        this.postActionsUseCase = new user_postActionsCheck_useCase_1.PostActionsUseCase();
        this.getDataUseCase = new user_getData_useCase_1.GetUserDataUseCase();
    }
}
exports.GetUserPostsController = GetUserPostsController;
