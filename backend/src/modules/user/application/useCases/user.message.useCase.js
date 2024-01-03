"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageUseCase = void 0;
const mongoose_1 = require("mongoose");
const user_dataAccess_1 = require("../../data/user.dataAccess");
const handleError_utils_1 = require("../../../../utils/handleError.utils");
const user_message_dataAccess_1 = require("../../data/user.message.dataAccess");
class MessageUseCase {
    constructor() {
        /**
         *
         * @param message - The message content
         * @param userId - The ID of the user
         * @param userName - The userName of the person who receives message
         */
        this.sendMessage = async (message, userId, userName) => {
            try {
                // get person Id with user name
                const { _id: personId } = await this.userDataAccess.getUserIdWithUserName(userName);
                // add to user
                userId = new mongoose_1.Types.ObjectId(userId);
                let sendByUser = true;
                let chatExists = await this.messageDataAccess.checkChatExists(userId, personId);
                if (chatExists) {
                    await this.messageDataAccess.addMessageToChat(userId, personId, message, sendByUser);
                }
                else {
                    await this.messageDataAccess.createChat(userId, personId, message, sendByUser);
                }
                // add to person
                sendByUser = false;
                chatExists = await this.messageDataAccess.checkChatExists(personId, userId);
                if (chatExists) {
                    await this.messageDataAccess.addMessageToChat(personId, userId, message, sendByUser);
                }
                else {
                    await this.messageDataAccess.createChat(personId, userId, message, sendByUser);
                }
                return personId;
            }
            catch (error) {
                handleError_utils_1.ErrorHandling.processError('Error in sendMessage, SendMessageUseCase', Error);
            }
        };
        this.getMessages = async (userId, userName) => {
            try {
                const { _id: personId } = await this.userDataAccess.getUserIdWithUserName(userName);
                const chatExists = await this.messageDataAccess.checkChatExists(userId, personId);
                if (!chatExists)
                    return [];
                return await this.messageDataAccess.getMessages(userId, personId);
            }
            catch (error) {
                handleError_utils_1.ErrorHandling.processError('Error in getMessages, MessageUseCase', error);
            }
        };
        this.getMessagesList = async (userId) => {
            try {
                return await this.messageDataAccess.getMessagesList(userId);
            }
            catch (error) {
                handleError_utils_1.ErrorHandling.processError('Error in getMessages, MessageUseCase', error);
            }
        };
        this.getMessageCount = async (userId) => {
            try {
                return await this.messageDataAccess.getMessageCount(userId);
            }
            catch (error) {
                handleError_utils_1.ErrorHandling.processError('Error in getMessages, MessageUseCase', error);
            }
        };
        this.markAsRead = async (userId, userName) => {
            try {
                const { _id: personId } = await this.userDataAccess.getUserIdWithUserName(userName);
                await this.messageDataAccess.markAsRead(userId, personId);
            }
            catch (error) {
                handleError_utils_1.ErrorHandling.processError('Error in markAsRead, MessageUseCase', error);
            }
        };
        this.messageDataAccess = new user_message_dataAccess_1.MessageDataAccess();
        this.userDataAccess = new user_dataAccess_1.UserDataAccess();
    }
}
exports.MessageUseCase = MessageUseCase;
