"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketService = void 0;
const socket_io_1 = require("socket.io");
const admin_ui_1 = require("@socket.io/admin-ui");
const mongoose_1 = require("mongoose");
const user_data_useCase_1 = require("../modules/user/application/useCases/user.data.useCase");
const user_socket_useCase_1 = require("../modules/user/application/useCases/user.socket.useCase");
const handleError_utils_1 = require("../utils/handleError.utils");
// Define constants
const CONNECTION_EVENT = "connection";
const DISCONNECT_REQUEST_EVENT = "disconnect-request";
const DISCONNECT_EVENT = "disconnect";
const NOTIFICATION_EVENT = "notification";
const MESSAGE_EVENT = "message";
// Define class for socket service
class SocketService {
    // Private constructor
    constructor() {
        this.socketUseCase = new user_socket_useCase_1.SocketUseCase();
        this.userDataUseCase = new user_data_useCase_1.UserDataUseCase();
    }
    // Create a static method to get the instance
    static getInstance() {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }
    // Set up Socket.IO with server and configuration
    async setUpSocketIo(server) {
        try {
            // Create socket configuration object
            const socketConfig = {
                cors: {
                    origin: ["http://localhost:4200", "https://admin.socket.io", 'https://cric-connect.netlify.app', "https://cric.uno"],
                    methods: ["GET", "POST"],
                    credentials: true,
                },
            };
            // Create socket server
            this.io = new socket_io_1.Server(server, socketConfig);
            await this.removeAll();
            // Handle socket connection event
            this.io.on(CONNECTION_EVENT, async (socket) => {
                try {
                    // Get user name and socket id from handshake query
                    const userName = socket.handshake.query.userName;
                    const socketId = socket.id;
                    // Set up user data for the connection
                    await this.socketUseCase.setSocketConnection(userName, socketId);
                    // Handle disconnect-request event
                    socket.on(DISCONNECT_REQUEST_EVENT, () => {
                        // Disconnect the socket
                        socket.disconnect();
                    });
                    // Handle disconnect event
                    socket.on(DISCONNECT_EVENT, async () => {
                        const socketId = socket.id;
                        // Remove user data for the connection
                        await this.socketUseCase.removeSocketConnection(socketId);
                    });
                }
                catch (error) {
                    handleError_utils_1.ErrorHandling.processError('Error in setUpSocketIo, SocketService', error);
                }
            });
            // Enable admin UI for monitoring
            (0, admin_ui_1.instrument)(this.io, { auth: false });
        }
        catch (error) {
            console.error(`Error setting up Socket.IO: ${error}`);
            throw new Error(error.message);
        }
    }
    // Send a notification to all sockets associated with the user
    async sendNotification(userId) {
        try {
            // Get sockets for the user
            const sockets = await this.userDataUseCase.getSockets(userId);
            // Check if sockets exist
            if (sockets) {
                // Loop through each socket
                sockets.forEach((socket) => {
                    this.io.to(socket).emit(NOTIFICATION_EVENT);
                });
            }
        }
        catch (error) {
            // Handle error
            this.log(error);
        }
    }
    // Send a notification to all sockets associated with the user
    async sendMessage(userId, message, userName) {
        try {
            // Get sockets for the user
            const userIdObj = new mongoose_1.Types.ObjectId(userId);
            const sockets = await this.userDataUseCase.getSockets(userIdObj);
            // Check if sockets exist
            if (sockets) {
                // Loop through each socket
                sockets.forEach((socket) => {
                    this.io.to(socket).emit(MESSAGE_EVENT, { message, userName, userId });
                });
            }
        }
        catch (error) {
            // Handle error
            this.log(error);
        }
    }
    // Log a message using a logger
    log(message) {
        // TODO: Use a logger for logging instead of console.log
        console.log(message);
    }
    async removeAll() {
        await this.socketUseCase.removeAllSocketConnections();
        this.io.disconnectSockets();
    }
}
exports.SocketService = SocketService;
