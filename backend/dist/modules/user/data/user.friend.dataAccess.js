"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFriendDataAccess = void 0;
const mongoose_1 = require("mongoose");
const user_schema_1 = require("../domain/user.schema");
const handleError_utils_1 = require("../../../utils/handleError.utils");
class UserFriendDataAccess {
    /**
     * Method to add a user to friend request list and friend request sent list
     *
     * @param userId - ID of the user
     * @param personId - ID of the user to be added as friend
     */
    async addToRequestList(userId, personId) {
        try {
            await user_schema_1.UserEntity.findByIdAndUpdate(userId, { $addToSet: { friendRequestsSent: personId } });
            await user_schema_1.UserEntity.findByIdAndUpdate(personId, { $addToSet: { friendRequestsReceived: userId } });
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in addToRequestList, UserFriendDataAccess", error);
        }
    }
    /**
     * Method to remove user from friend request list and friend request sent list
     *
     * @param userId - ID of the user
     * @param personId - ID of the user to be added as friend
     */
    async removeFromRequestList(userId, personId) {
        try {
            await user_schema_1.UserEntity.findByIdAndUpdate(personId, { $pull: { friendRequestsSent: userId } });
            await user_schema_1.UserEntity.findByIdAndUpdate(userId, { $pull: { friendRequestsReceived: personId } });
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in removeFromRequestList, UserFriendDataAccess", error);
        }
    }
    /**
     * Method to add IDs to friends list for both user
     *
     * @param userId - ID of the user
     * @param personId - ID of the user to be added as friend
     */
    async addToFriendsList(userId, personId) {
        try {
            await user_schema_1.UserEntity.findByIdAndUpdate(personId, { $addToSet: { friends: userId } });
            await user_schema_1.UserEntity.findByIdAndUpdate(userId, { $addToSet: { friends: personId } });
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in addToFriendsList, UserFriendDataAccess", error);
        }
    }
    /**
     * Method to remove IDs from friends list for both user
     *
     * @param userId - ID of the user
     * @param personId - ID of the user to rmoved added from friend list
     */
    async removeFromFriendList(userId, personId) {
        try {
            await user_schema_1.UserEntity.findByIdAndUpdate(personId, { $pull: { friends: userId } });
            await user_schema_1.UserEntity.findByIdAndUpdate(userId, { $pull: { friends: personId } });
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in removeFromFriendList, UserFriendDataAccess", error);
        }
    }
    /**
     * Method to get all friends
     *
     * @param userId - ID of the user
     */
    async getAllFriends(userId) {
        try {
            const user = await user_schema_1.UserEntity.aggregate([
                { $match: { _id: new mongoose_1.Types.ObjectId(userId) } },
                { $project: { friends: 1, _id: 0 } },
                { $lookup: { from: "users", localField: "friends", foreignField: "_id", as: "friends" } },
                { $project: { 'friends.name': 1, 'friends.userName': 1, 'friends.profilePicture': 1 } }
            ]);
            return user[0]?.friends || [];
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in removeFromFriendList, UserFriendDataAccess", error);
        }
    }
}
exports.UserFriendDataAccess = UserFriendDataAccess;
