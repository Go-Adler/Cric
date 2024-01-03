"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketUseCase = void 0;
const handleError_utils_1 = require("../../../../utils/handleError.utils");
const user_dataAccess_1 = require("../../data/user.dataAccess");
const user_socket_dataAccess_1 = require("../../data/user.socket.dataAccess");
class SocketUseCase {
    constructor() {
        this.userDataAccess = new user_dataAccess_1.UserDataAccess();
        this.socketDataAccess = new user_socket_dataAccess_1.SocketDataAccess();
    }
    /**
     * Method to store socket id in database.
     * @param userName - User's name.
     * @param socketId - Socket ID.
     */
    async setSocketConnection(userName, socketId) {
        try {
            await this.userDataAccess.addSocketId(userName, socketId);
            await this.socketDataAccess.socketAdd(userName, socketId);
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error while setting socket connection", error);
        }
    }
    /**
   * Method to remove a socket connection based on the socket ID.
   * @param socketId - Socket ID to be removed.
   * @returns A promise that resolves to the socket data or rejects with an error.
   */
    async removeSocketConnection(socketId) {
        try {
            const socket = await this.socketDataAccess.removeSocketId(socketId);
            if (socket) {
                const { userName } = socket;
                await this.userDataAccess.removeSocketId(userName, socketId);
            }
            else
                throw new Error('Socket not found');
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error while removing socket connection", error);
        }
    }
    /**
   * Method to remove all socket connections once server restarts. // Can be removed in production
   *
   */
    async removeAllSocketConnections() {
        try {
            const sockets = await this.socketDataAccess.getAllSockets();
            for (const socket of sockets) {
                await this.removeSocketConnection(socket.socketId);
            }
            await this.userDataAccess.removeAllSockets();
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error while removing socket connection", error);
        }
    }
}
exports.SocketUseCase = SocketUseCase;
