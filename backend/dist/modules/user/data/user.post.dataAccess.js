"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPostDataAccess = void 0;
const mongoose_1 = require("mongoose");
const user_schema_1 = require("../domain/user.schema");
const user_postSchema_1 = require("../domain/user.postSchema");
/**
 * UserPostDataAccess class for handling user post related operations
 */
class UserPostDataAccess {
    /**
     * Create a new post for a user and return the created post
     * @param userId - The ID of the user
     * @param postData - The data of the post to be created
     * @returns The created post
     */
    async createPost(userId, postData) {
        try {
            if (!mongoose_1.Types.ObjectId.isValid(userId)) {
                throw new Error("Invalid userId");
            }
            const post = await user_postSchema_1.PostEntity.create(postData);
            await user_schema_1.UserEntity.findByIdAndUpdate(userId, { $push: { postIds: post._id } });
            return post;
        }
        catch (error) {
            console.error(`Error in post creation: ${error.message}`);
            throw new Error("Error in post creation");
        }
    }
    /**
     * Get posts for a specific user and return the posts
     * @param id - The ID of the user
     * @param skip - The number of posts to skip (default is 0)
     * @returns The posts of the user
     */
    async getUserPosts(id, skip = 0) {
        try {
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                throw new Error("Invalid user id");
            }
            const post = await user_schema_1.UserEntity.aggregate([
                { $match: { _id: new mongoose_1.Types.ObjectId(id) } },
                {
                    $project: {
                        postIds: 1,
                    },
                },
                { $lookup: { from: "posts", localField: "postIds", foreignField: "_id", as: "posts" } },
                {
                    $unwind: "$posts",
                },
                {
                    $project: {
                        posts: 1,
                    },
                },
                {
                    $sort: { "posts._id": -1 },
                },
                {
                    $skip: skip,
                },
                {
                    $limit: 6,
                },
                { $group: { _id: "$_id", posts: { $push: "$posts" } } },
            ]);
            return post[0]?.posts || [];
        }
        catch (error) {
            console.error(`Error fetching user posts: ${error.message}`);
            throw new Error("Error fetching user posts");
        }
    }
    /**
     * Get posts for a specific user and return the posts
     * @param id - The ID of the user
     * @param skip - The number of posts to skip (default is 0)
     * @returns The posts of the user
     */
    async getFeedPosts(id, skip = 0) {
        try {
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                throw new Error("Invalid user id");
            }
            const userFriendsAndPosts = await user_schema_1.UserEntity.aggregate([
                { $match: { _id: new mongoose_1.Types.ObjectId(id) } },
                { $project: { friends: 1, postIds: 1 } },
                { $unwind: "$friends" },
                { $lookup: { from: "users", localField: "friends", foreignField: "_id", as: "friendDetails" } },
                { $unwind: "$friendDetails" },
                { $project: { "friendDetails.postIds": 1 } },
                { $unwind: "$friendDetails.postIds" },
                { $group: { _id: "$_id", postIdsAllUsers: { $push: "$friendDetails.postIds" } } },
                { $unwind: "$postIdsAllUsers" },
                { $sort: { postIdsAllUsers: -1 } },
                { $skip: skip },
                { $limit: 10 },
                { $lookup: { from: "posts", localField: "postIdsAllUsers", foreignField: "_id", as: "posts" } },
                { $unwind: "$posts" },
                { $lookup: { from: "users", localField: "posts.userId", foreignField: "_id", as: "postUser" } }, // Add this lookup stage
                { $unwind: "$postUser" }, // Unwind the postUser array
                { $addFields: { "posts.userName": "$postUser.userName", "posts.name": "$postUser.name", "posts.profilePicture": "$postUser.profilePicture" } }, // Add the userName to each post
                { $sort: { "posts._id": -1 } },
                { $group: { _id: "$_id", posts: { $push: "$posts" } } },
            ]);
            return userFriendsAndPosts[0]?.posts || [];
        }
        catch (error) {
            console.error(`Error fetching user posts: ${error.message}`);
            throw new Error("Error fetching user posts");
        }
    }
    /**
     * Get post with id
     * @param postId - The ID of the post
     * @returns the post requested
     */
    async getUserPost(postId) {
        try {
            if (!mongoose_1.Types.ObjectId.isValid(postId)) {
                throw new Error("Invalid post id");
            }
            const post = await user_postSchema_1.PostEntity.findById(postId);
            if (!post)
                throw new Error("Post fetch failed");
            const userData = await user_schema_1.UserEntity.findById(post.userId).select("profilePicture name userName");
            if (!userData)
                throw new Error("Cannot find user");
            const { profilePicture, name, userName } = userData;
            return { post, profilePicture, name, userName };
        }
        catch (error) {
            console.error(`Error fetching user posts: ${error.message}`);
            throw new Error("Error fetching user posts");
        }
    }
    /**
     * Like a post
     * @param userId - The ID of the user who likes the post
     * @param postId - The ID of the post to be liked
     */
    async likePost(userId, postId) {
        try {
            if (!mongoose_1.Types.ObjectId.isValid(userId) || !mongoose_1.Types.ObjectId.isValid(postId)) {
                throw new Error("Invalid userId or postId");
            }
            const userLiked = await user_postSchema_1.PostEntity.findOne({
                _id: postId,
                usersLiked: { $in: [userId] },
            });
            if (!userLiked) {
                await user_postSchema_1.PostEntity.findByIdAndUpdate(postId, {
                    $addToSet: { usersLiked: userId },
                    $inc: { "actions.likes": 1 },
                });
            }
        }
        catch (error) {
            console.error(`Error liking post: ${error.message}`);
            throw new Error("Error liking post");
        }
    }
    /**
     * Unlike a post
     * @param userId - The ID of the user who unlikes the post
     * @param postId - The ID of the post to be unliked
     */
    async unlikePost(userId, postId) {
        try {
            if (!mongoose_1.Types.ObjectId.isValid(userId) || !mongoose_1.Types.ObjectId.isValid(postId)) {
                throw new Error("Invalid userId or postId");
            }
            const userLiked = await user_postSchema_1.PostEntity.findOne({
                _id: postId,
                usersLiked: { $in: [userId] },
            });
            if (userLiked) {
                await user_postSchema_1.PostEntity.findByIdAndUpdate(postId, {
                    $pull: { usersLiked: userId },
                    $inc: { "actions.likes": -1 },
                });
            }
        }
        catch (error) {
            console.error(`Error unliking post: ${error.message}`);
            throw new Error("Error unliking post");
        }
    }
}
exports.UserPostDataAccess = UserPostDataAccess;
