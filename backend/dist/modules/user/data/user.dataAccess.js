"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataAccess = void 0;
const user_schema_1 = require("../domain/user.schema");
const user_postSchema_1 = require("../domain/user.postSchema");
const handleError_utils_1 = require("../../../utils/handleError.utils");
const validateString_utils_1 = require("../../../utils/validateString.utils");
// User Data Access Class
class UserDataAccess {
    /**
     * Create a new user
     * @param name - The name of the user
     * @param userName - The username of the user
     * @param gender - The gender of the user
     * @param email - The email of the user
     * @param phone - The phone number of the user
     * @param password - The password of the user
     * @returns The ID of the created user
     */
    async createUser(name, userName, gender, email, phone, password) {
        try {
            // Validate input parameters
            (0, validateString_utils_1.validateString)(name, "name");
            (0, validateString_utils_1.validateString)(userName, "userName");
            (0, validateString_utils_1.validateString)(gender, "gender");
            (0, validateString_utils_1.validateString)(email, "email");
            (0, validateString_utils_1.validateString)(phone, "phone");
            (0, validateString_utils_1.validateString)(password, "password");
            // Create a new user using the UserEntity model
            const user = await user_schema_1.UserEntity.create({
                name,
                userName,
                gender,
                email,
                phone,
                password,
            });
            // Return the user's ID
            return user._id ? user.id : "";
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in createUser, userDataAccess", error);
        }
    }
    /**
     * Retrieve user data by username
     * @param userName - The username of the user
     * @returns The user data or null if not found
     */
    async getUserByUserName(userName) {
        try {
            // Validate input parameter
            (0, validateString_utils_1.validateString)(userName, "userName");
            // Find user by username using the UserEntity model
            return await user_schema_1.UserEntity.findOne({ userName });
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in getUserByUserName, userDataAccess", error);
        }
    }
    /**
     * Check if a username already exists
     * @param userName - The username to check
     * @returns True if the username exists, false otherwise
     */
    async checkUserByUserName(userName) {
        try {
            const user = await user_schema_1.UserEntity.findOne({ userName });
            return user ? true : false;
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in checkUserByUserName, userDataAccess", error);
        }
    }
    /**
     * Get user data by email
     * @param email - The email of the user
     * @returns The user data or null if not found
     */
    async getUserByEmail(email) {
        try {
            const user = await user_schema_1.UserEntity.findOne({ email });
            return user;
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in getUserByEmail, userDataAccess", error);
        }
    }
    /**
     * Get user name by user ID
     * @param userId - The ID of the user
     * @returns The user's name or "User not found" if not found
     */
    async getNameById(userId) {
        try {
            const user = await user_schema_1.UserEntity.findById(userId, { _id: 0, name: 1 });
            return user?.name ?? "User not found";
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in getNameById, userDataAccess", error);
        }
    }
    /**
     * Get email by user ID
     * @param userId - The ID of the user
     * @returns The user's email or "User not found" if not found
     */
    async getEmailById(userId) {
        try {
            const user = await user_schema_1.UserEntity.findById(userId, { _id: 0, email: 1 });
            return user?.email ?? "User not found";
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in getEmailById, userDataAccess", error);
        }
    }
    /**
     * Get the count of friends by user ID
     * @param userId - The ID of the user
     * @returns The count of friends or 0 if not found
     */
    async getFriendsCountById(userId) {
        try {
            const user = await user_schema_1.UserEntity.findById(userId, { _id: 0, friends: 1 });
            return user?.friends.length || 0;
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in getFriendsCountById, userDataAccess", error);
        }
    }
    /**
     * Get user name by user ID
     * @param userId - The ID of the user
     * @returns The user's name or "User not found" if not found
     */
    async getUserNameById(userId) {
        try {
            const user = await user_schema_1.UserEntity.findById(userId, { _id: 0, userName: 1 });
            return user?.userName ?? "User not found";
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in getUserNameById, userDataAccess", error);
        }
    }
    /**
     * Get user ID by email
     * @param email - The email of the user
     * @returns The user ID or null if not found
     */
    async getUserIdWithEmail(email) {
        try {
            const user = await user_schema_1.UserEntity.findOne({ email });
            return user?._id || null;
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in getUserIdWithEmail, userDataAccess", error);
        }
    }
    /**
     * Check if an email already exists
     * @param email - The email to check
     * @returns The user ID if the email exists and the user is not blocked, false otherwise
     */
    async checkUserByEmail(email) {
        try {
            const user = await user_schema_1.UserEntity.findOne({ email });
            return user?._id && !user?.isBlocked ? user?._id : false;
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in checkUserByEmail, userDataAccess", error);
        }
    }
    /**
     * Get user data by phone number
     * @param phone - The phone number of the user
     * @returns The user data or null if not found
     */
    async getUserByPhone(phone) {
        try {
            const user = await user_schema_1.UserEntity.findOne({ phone });
            return user;
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in getUserByPhone, userDataAccess", error);
        }
    }
    /**
     * Check if a phone number already exists
     * @param phone - The phone number to check
     * @returns True if the phone number exists, false otherwise
     */
    async checkUserByPhone(phone) {
        try {
            const user = await user_schema_1.UserEntity.findOne({ phone });
            return user ? true : false;
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in checkUserByPhone, userDataAccess", error);
        }
    }
    /**
     * Get user password by email
     * @param email - The email of the user
     * @returns The user password or an empty string if not found
     */
    async getUserPasswordByEmail(email) {
        try {
            const user = await user_schema_1.UserEntity.findOne({ email });
            return user?.password || "";
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in getUserPasswordByEmail, userDataAccess", error);
        }
    }
    /**
     * Check if a user's email is verified
     * @param email - The email of the user
     * @returns True if the email is verified, false otherwise
     */
    async isVerified(email) {
        try {
            const { isVerified } = await user_schema_1.UserEntity.findOne({ email }).select("isVerified");
            return isVerified;
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in isVerified, userDataAccess", error);
        }
    }
    /**
     * Verify a user by setting isVerified to true
     * @param userId - The ID of the user to verify
     */
    async verifyUser(userId) {
        try {
            await user_schema_1.UserEntity.findByIdAndUpdate(userId, { isVerified: true });
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in verifyUser, userDataAccess", error);
        }
    }
    /**
     * Change the password for a user
     * @param userId - The ID of the user
     * @param password - The new password
     */
    async changePassword(userId, password) {
        try {
            await user_schema_1.UserEntity.findByIdAndUpdate(userId, { password });
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in changePassword, userDataAccess", error);
        }
    }
    /**
     * Get the profile picture by user ID
     * @param id - The ID of the user
     * @returns The user's profile picture or null if not found
     */
    async getUserProfilePictureWithId(id) {
        try {
            return await user_schema_1.UserEntity.findById(id).select("profilePicture");
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in getUserProfilePictureWithId, userDataAccess", error);
        }
    }
    /**
     * Get user ID by user name
     * @param userName - The user name
     * @returns The user ID or null if not found
     */
    async getUserIdWithUserName(userName) {
        try {
            return await user_schema_1.UserEntity.findOne({ userName }).select("_id");
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in getUserIdWithUserName, userDataAccess", error);
        }
    }
    /**
     * Get all non-admin users
     * @returns An array of non-admin users
     */
    async getUsers() {
        try {
            const users = await user_schema_1.UserEntity.find({ isAdmin: false });
            return users;
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in getUsers, userDataAccess", error);
        }
    }
    /**
     * Find users based on input (case-insensitive) in username, email, or name
     * @param input - The input to search for
     * @returns An array of users matching the search criteria
     */
    async findUsers(input) {
        try {
            const users = await user_schema_1.UserEntity.find({
                isAdmin: false,
                $or: [{ userName: { $regex: input, $options: "i" } }, { email: { $regex: input, $options: "i" } }, { name: { $regex: input, $options: "i" } }],
            }, "_id userName profilePicture name");
            return users;
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in findUsers, userDataAccess", error);
        }
    }
    /**
     * Unblock a user by setting isBlocked to false
     * @param userId - The ID of the user to unblock
     * @returns The updated user object
     */
    async unblockUser(userId) {
        try {
            const user = await user_schema_1.UserEntity.findByIdAndUpdate(userId, { isBlocked: false }, { new: true });
            return user;
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in unblockUser, userDataAccess", error);
        }
    }
    /**
     * Block a user by setting isBlocked to true
     * @param userId - The ID of the user to block
     * @returns The updated user object
     */
    async blockUser(userId) {
        try {
            const user = await user_schema_1.UserEntity.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
            return user;
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in blockUser, userDataAccess", error);
        }
    }
    /**
     * Add socket ID to user
     *
     * @param userName - The user name of the user
     * @param socketId - The ID of the socket connection
     */
    async addSocketId(userName, socketId) {
        try {
            await user_schema_1.UserEntity.findOneAndUpdate({ userName }, { $addToSet: { socketId } });
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in addSocketId, userDataAccess", error);
        }
    }
    /**
     * Remove socket id from user
     * @param userName - The username of the user
     * @param socketId - The ID of the socket connection to remove
     */
    async removeSocketId(userName, socketId) {
        try {
            await user_schema_1.UserEntity.findOneAndUpdate({ userName }, { $pull: { socketId } });
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in removeSocketId, userDataAccess", error);
        }
    }
    /**
     * Check if a post belongs to the specified user
     * @param postId - The ID of the post
     * @param currentId - The ID of the current user
     * @returns false if the post belongs to the user, userId otherwise
     */
    async checkDifferentUser(postId, currentId) {
        try {
            const { userId } = (await user_postSchema_1.PostEntity.findById(postId));
            if (userId.toString() === currentId) {
                return false;
            }
            else {
                return userId;
            }
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in checkDifferentUser, userDataAccess", error);
        }
    }
    /**
     * Get socket connections of a user by user ID
     * @param userId - The ID of the user
     * @returns An array of socket connections or an empty array if not found
     */
    async getSocketsWithId(userId) {
        try {
            const { socketId } = (await user_schema_1.UserEntity.findById(userId).select("socketId"));
            return socketId || [];
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in getSocketsWithId, userDataAccess", error);
        }
    }
    /**
     *
     * @param userId - The ID of the user
     * @returns User Id.
     */
    async checkUserExisting(userId) {
        try {
            return await user_schema_1.UserEntity.findById(userId).select("_id");
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in checkUserExisting, userGetDataUseCase", error);
        }
    }
    /**
     *
     * @param userId - The ID of the user
     * @returns User Id if friend else null
     */
    async isFriend(personId, userId) {
        try {
            return await user_schema_1.UserEntity.findOne({
                _id: userId,
                friends: { $in: [personId] },
            }).select("_id");
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in isFriend, userGetDataUseCase", error);
        }
    }
    /**
     *
     * @param userId - The ID of the user
     * @returns User Id if friend else null
     */
    async isRequestedByUser(personId, userId) {
        try {
            return await user_schema_1.UserEntity.findOne({
                _id: personId,
                friendRequestsReceived: { $in: [userId] },
            }).select("_id");
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in isRequestedByUser, userGetDataUseCase", error);
        }
    }
    /**
     *
     * @param userId - The ID of the user
     * @returns User Id if friend else null
     */
    async isRequestedByPerson(personId, userId) {
        try {
            return await user_schema_1.UserEntity.findOne({
                _id: personId,
                friendRequestsSent: { $in: [userId] },
            }).select("_id");
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in isRequestedByPerson, userGetDataUseCase", error);
        }
    }
    /**
     *  Method to check user socket exists
     *
     * @param personId - The ID of the user to be checked
     * @returns The length of socketId array
     */
    async socketExists(personId) {
        try {
            return await user_schema_1.UserEntity.findById(personId).select("socketId");
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in isRequestedByPerson, userGetDataUseCase", error);
        }
    }
    /**
   *  Method to check user socket exists
   *
   * @param personId - The ID of the user to be checked
   * @returns The length of socketId array
   */
    async removeAllSockets() {
        try {
            await user_schema_1.UserEntity.updateMany({}, { $set: { socketId: [] } });
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in isRequestedByPerson, userGetDataUseCase", error);
        }
    }
}
exports.UserDataAccess = UserDataAccess;
