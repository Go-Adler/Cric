"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketDataAccess = void 0;
const handleError_utils_1 = require("../../../utils/handleError.utils");
const user_socketSchema_1 = require("../domain/user.socketSchema");
class SocketDataAccess {
    /**
     * Method to add socket ID to the all socket list.
     *
     * @param userName - userName of the user.
     * @param socketId - ID of the socket to be added.
     */
    async socketAdd(userName, socketId) {
        try {
            await user_socketSchema_1.SocketEntity.create({ userName, socketId });
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in socketAdd, SocketDataAccess", error);
        }
    }
    /**
     * Method to remove socket ID from socket collection
     *
     * @param socketId - Socket ID
     * @returns
     */
    async removeSocketId(socketId) {
        try {
            return await user_socketSchema_1.SocketEntity.findOneAndRemove({ socketId });
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in removeSocketId, SocketDataAccess", error);
        }
    }
    async getAllSockets() {
        try {
            return await user_socketSchema_1.SocketEntity.find({});
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError('Error in getAllSockets, SocketDataAccess', error);
        }
    }
}
exports.SocketDataAccess = SocketDataAccess;
