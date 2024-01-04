"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMessageController = void 0;
const user_message_useCase_1 = require("../../application/useCases/user.message.useCase");
const user_getAwsUrl_useCase_1 = require("../../application/useCases/user.getAwsUrl.useCase");
const socketService_service_1 = require("../../../../services/socketService.service");
const user_getData_useCase_1 = require("../../application/useCases/user.getData.useCase");
class UserMessageController {
    constructor() {
        this.sendMessage = async (req, res, next) => {
            try {
                const { userId } = req.user;
                const { message, userName } = req.body;
                const personId = await this.messageUseCase.sendMessage(message, userId, userName);
                const userNameReceiver = await this.getUserDataUseCase.getUserName(userId);
                await this.socketService.sendMessage(personId, message, userNameReceiver);
                res.json({ message: 'Message sent successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getMessages = async (req, res, next) => {
            try {
                const { userId } = req.user;
                const { userName } = req.body;
                const messages = await this.messageUseCase.getMessages(userId, userName);
                res.json({ messages });
            }
            catch (error) {
                next(error);
            }
        };
        this.getMessagesList = async (req, res, next) => {
            try {
                const { userId } = req.user;
                let messages = await this.messageUseCase.getMessagesList(userId);
                messages = await this.awsUrlUseCase.getMessageWithUrl(messages);
                res.json({ messages });
            }
            catch (error) {
                next(error);
            }
        };
        this.markAsRead = async (req, res, next) => {
            try {
                const { userId } = req.user;
                const { userName } = req.body;
                await this.messageUseCase.markAsRead(userId, userName);
                res.json({ message: 'Mark as read success.' });
            }
            catch (error) {
                next(error);
            }
        };
        this.messageUseCase = new user_message_useCase_1.MessageUseCase();
        this.awsUrlUseCase = new user_getAwsUrl_useCase_1.GetAwsUrlUseCase();
        this.socketService = socketService_service_1.SocketService.getInstance();
        this.getUserDataUseCase = new user_getData_useCase_1.GetUserDataUseCase();
    }
}
exports.UserMessageController = UserMessageController;
