"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserDataUseCase = void 0;
const user_dataAccess_1 = require("../../data/user.dataAccess");
const handleError_utils_1 = require("../../../../utils/handleError.utils");
/**
 * Class responsible for handling user data retrieval use cases.
 */
class GetUserDataUseCase {
    /**
     * Initializes the use case with a UserDataAccess instance.
     */
    constructor() {
        this.userDataAccess = new user_dataAccess_1.UserDataAccess();
    }
    /**
     * Retrieves the profile picture of a user by their ID.
     * @param userId - The unique identifier of the user.
     * @returns A promise that resolves to the user's profile picture or null if an error occurs.
     */
    async getProfilePicture(userId) {
        try {
            const isUserExisting = await this.userDataAccess.checkUserExisting(userId);
            if (!!isUserExisting) {
                const userData = await this.userDataAccess.getUserProfilePictureWithId(userId);
                const { profilePicture } = userData;
                return profilePicture || '';
            }
            throw new Error("User not found");
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in getProfilePicture, userGetDataUseCase", error);
        }
    }
    /**
     * Retrieves the user ID based on the username.
     * @param userName - The username of the user.
     * @returns A promise that resolves to the user's ID or null if not found.
     */
    async getUserId(userName) {
        try {
            const user = await this.userDataAccess.getUserIdWithUserName(userName);
            return user?._id;
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in getUserId, userGetDataUseCase", error);
        }
    }
    /**
    * Method to check a person is online
    *
    * @param userName - The username of the user.
    * @returns A promise that resolves to the user's ID or null if not found.
    */
    async isOnline(userId) {
        try {
            const user = await this.userDataAccess.socketExists(userId);
            return !!user?.socketId.length;
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in getUserId, userGetDataUseCase", error);
        }
    }
    /**
     * Retrieves the name of a user by their ID.
     * @param userId - The unique identifier of the user.
     * @returns A promise that resolves to the user's name or null if an error occurs.
     */
    async getName(userId) {
        try {
            return await this.userDataAccess.getNameById(userId);
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in getProfilePicture, userGetDataUseCase", error);
        }
    }
    /**
     * Retrieves the username of a user by their ID.
     * @param userId - The unique identifier of the user.
     * @returns A promise that resolves to the user's username or null if an error occurs.
     */
    async getUserName(userId) {
        try {
            return await this.userDataAccess.getUserNameById(userId);
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in getProfilePicture, userGetDataUseCase", error);
        }
    }
    /**
     * Retrieves the count of friends for a user by their ID.
     * @param userId - The unique identifier of the user.
     * @returns A promise that resolves to the count of friends or 0 if an error occurs.
     */
    async getFriendsCount(userId) {
        try {
            return await this.userDataAccess.getFriendsCountById(userId);
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in getProfilePicture, userGetDataUseCase", error);
            return 0;
        }
    }
    /**
     * Retrieves the email of a user by their ID.
     * @param userId - The unique identifier of the user.
     * @returns A promise that resolves to the user's email or an empty string if an error occurs.
     */
    async getEmail(userId) {
        try {
            return await this.userDataAccess.getEmailById(userId);
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in getProfilePicture, userGetDataUseCase", error);
            return "";
        }
    }
    /**
     * Retrieves all users in the system.
     * @returns A promise that resolves to an array of users or an empty array if an error occurs.
     */
    async getAllUsers() {
        try {
            return await this.userDataAccess.getUsers();
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in getProfilePicture, userGetDataUseCase", error);
        }
    }
    /**
     * Blocks a user based on the user ID.
     * @param userId - The ID of the user to be blocked.
     * @returns {Promise<any>} - A promise that resolves after blocking the user.
     */
    async blockUser(userId) {
        try {
            const blockedUser = await this.userDataAccess.blockUser(userId);
            return blockedUser;
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in blockUser, userGetDataUseCase", error);
        }
    }
    /**
     * Unblocks a user based on the user ID.
     * @param userId - The ID of the user to be unblocked.
     * @returns {Promise<any>} - A promise that resolves after unblocking the user.
     */
    async unblockUser(userId) {
        try {
            const unblockedUser = await this.userDataAccess.unblockUser(userId);
            return unblockedUser;
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in unblock, userGetDataUseCase", error);
        }
    }
    /**
     * Unblocks a user based on the user ID.
     * @param userId - The ID of the user to be unblocked.
     * @returns {Promise<any>} - A promise that resolves after unblocking the user.
     */
    async isFriend(personId, userId) {
        try {
            if (await this.userDataAccess.isFriend(personId, userId))
                return 'friend';
            if (await this.userDataAccess.isRequestedByUser(personId, userId))
                return 'requestSent';
            if (await this.userDataAccess.isRequestedByPerson(personId, userId))
                return 'requestReceived';
            else
                return 'stranger';
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in unblock, userGetDataUseCase", error);
        }
    }
    /**
     *
     * @param userId - The ID of the user
     * @returns object containing user-name, name, profilePicture, friendsCount
     */
    async getBasicInfo(userId) {
        try {
            const isUserExisting = await this.userDataAccess.checkUserExisting(userId);
            if (!!isUserExisting) {
                const userName = await this.userDataAccess.getUserNameById(userId);
                const name = await this.userDataAccess.getNameById(userId);
                const userData = await this.userDataAccess.getUserProfilePictureWithId(userId);
                const friendsCount = await this.userDataAccess.getFriendsCountById(userId);
                let { profilePicture } = userData;
                if (!profilePicture)
                    profilePicture = '';
                return { userName, name, profilePicture, friendsCount };
            }
            throw new Error("User not found");
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError('Error in getBasicInfo, GetUserDataUseCase', error);
        }
    }
}
exports.GetUserDataUseCase = GetUserDataUseCase;
