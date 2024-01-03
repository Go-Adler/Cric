"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataUseCase = void 0;
const user_dataAccess_1 = require("../../data/user.dataAccess");
const handleError_utils_1 = require("../../../../utils/handleError.utils");
/**
 * Class to handle user data-related use cases.
 */
class UserDataUseCase {
    /**
     * Constructor to initialize UserDataAccess and SocketDataAccess instances.
     */
    constructor() {
        this.userDataAccess = new user_dataAccess_1.UserDataAccess();
    }
    /**
     * Method to check if a user is the same as the one associated with a post.
     * @param postId - Post ID.
     * @param userId - User ID.
     * @returns A promise that resolves to a boolean value or rejects with an error.
     */
    async checkSameUser(postId, userId) {
        try {
            return await this.userDataAccess.checkDifferentUser(postId, userId);
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error while checking user", error);
        }
    }
    /**
     * Method to retrieve all sockets associated with a user.
     * @param userId - User ID.
     * @returns A promise that resolves to an array of socket IDs or rejects with an error.
     */
    async getSockets(userId) {
        try {
            return await this.userDataAccess.getSocketsWithId(userId);
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error while getting sockets", error);
        }
    }
}
exports.UserDataUseCase = UserDataUseCase;
