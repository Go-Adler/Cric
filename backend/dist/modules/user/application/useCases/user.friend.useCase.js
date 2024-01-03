"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFriendUseCase = void 0;
const user_friend_dataAccess_1 = require("../../data/user.friend.dataAccess");
const handleError_utils_1 = require("../../../../utils/handleError.utils");
class UserFriendUseCase {
    constructor() {
        this.friendDataAccess = new user_friend_dataAccess_1.UserFriendDataAccess();
    }
    /**
     * Method to add friend request
     *
     * @param userId - The ID of the user
     * @param personId - The ID of the user for friend request to be send.
     */
    async addRequest(userId, personId) {
        try {
            await this.friendDataAccess.addToRequestList(userId, personId);
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError('Erron in addRequest, UserFriendUseCase', error);
        }
    }
    /**
     * Method to accept friend
     *
     * @param userId - The ID of the user who accept request
     * @param personId - The ID of the user whose request to be accepted
     */
    async acceptRequest(userId, personId) {
        try {
            await this.friendDataAccess.removeFromRequestList(userId, personId);
            await this.friendDataAccess.addToFriendsList(userId, personId);
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError('Erron in acceptRequest, UserFriendUseCase', error);
        }
    }
    /**
     * Method to reject friend
     *
     * @param userId - The ID of the user who accept request
     * @param personId - The ID of the user whose request to be accepted
     */
    async rejectRequest(userId, personId) {
        try {
            await this.friendDataAccess.removeFromRequestList(userId, personId);
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError('Erron in rejectRequest, UserFriendUseCase', error);
        }
    }
    /**
   * Method to remove friend
   *
   * @param userId - The ID of the user who accept request
   * @param personId - The ID of the user who need to be removed
   */
    async removeFriend(userId, personId) {
        try {
            await this.friendDataAccess.removeFromFriendList(userId, personId);
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError('Erron in removeFriend, UserFriendUseCase', error);
        }
    }
    /**
   * Method to get friend list
   *
   * @param userId - The ID of the user who accept request
   */
    async getAll(userId) {
        try {
            return await this.friendDataAccess.getAllFriends(userId);
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError('Erron in removeFriend, UserFriendUseCase', error);
        }
    }
}
exports.UserFriendUseCase = UserFriendUseCase;
