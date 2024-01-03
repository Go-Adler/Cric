"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageDataAccess = void 0;
const mongoose_1 = require("mongoose");
const user_schema_1 = require("../domain/user.schema");
const handleError_utils_1 = require("../../../utils/handleError.utils");
class MessageDataAccess {
    /**
     * Method to check if a chat exist or not
     *
     * @param userId - The ID of the user
     * @param personId - The ID of the person
     * @returns userId if exists or null if not exists
     */
    async checkChatExists(userId, personId) {
        try {
            return await user_schema_1.UserEntity.exists({ _id: userId, chats: { $elemMatch: { personId } } });
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in checkChatExists, MessageDataAccess", error);
        }
    }
    /**
     *
     * @param userId - The ID of the user
     * @param personId - The ID of the person who received message
     * @param message - The message text
     * @param sendByUser - boolean, send by user or not
     */
    async createChat(userId, personId, message, sendByUser) {
        try {
            await user_schema_1.UserEntity.findOneAndUpdate(userId, { $push: { chats: { personId, chatTexts: [{ message, sendByUser }] } } }, { new: true });
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in createChat, MessageDataAccess", error);
        }
    }
    /**
     *
     * @param userId - The ID of the user
     * @param personId - The ID of the person who received message
     * @param message - The message text
     * @param sendByUser - boolean, send by user or not
     */
    async addMessageToChat(userId, personId, message, sendByUser) {
        try {
            // Mark as unread
            if (!sendByUser) {
                await user_schema_1.UserEntity.findOneAndUpdate({ _id: userId, chats: { $elemMatch: { personId } } }, { $set: { "chats.$.read": false } });
            }
            // Add message
            await user_schema_1.UserEntity.findOneAndUpdate({ _id: userId, chats: { $elemMatch: { personId } } }, { $push: { "chats.$.chatTexts": { message, sendByUser } } });
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in addMessageToChat, MessageDataAccess", error);
        }
    }
    async getMessages(userId, personId) {
        try {
            //  Mark as read
            await user_schema_1.UserEntity.findOneAndUpdate({ _id: userId, chats: { $elemMatch: { personId } } }, { $set: { "chats.$.read": true } });
            // Get messages
            const result = await user_schema_1.UserEntity.aggregate([
                { $match: { _id: new mongoose_1.Types.ObjectId(userId) } },
                { $unwind: "$chats" },
                { $match: { "chats.personId": personId } },
                { $unwind: "$chats.chatTexts" },
                { $sort: { "chats.chatTexts.time": -1 } },
                { $limit: 20 },
                {
                    $group: {
                        _id: "$_id",
                        chats: { $push: "$chats.chatTexts" },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        chats: 1,
                    },
                },
                {
                    $project: {
                        chats: { $reverseArray: "$chats" },
                    },
                },
            ]);
            return result[0].chats;
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in getMessages, CheckChatExists", error);
        }
    }
    async getMessagesList(userId) {
        try {
            return await user_schema_1.UserEntity.aggregate([
                { $match: { _id: new mongoose_1.Types.ObjectId(userId) } },
                { $unwind: '$chats' },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'chats.personId',
                        foreignField: '_id',
                        as: 'personDetails'
                    }
                },
                {
                    $unwind: {
                        path: '$personDetails',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        _id: 0,
                        'personDetails.name': 1,
                        'personDetails.email': 1,
                        'personDetails.userName': 1,
                        'personDetails.socketId': 1,
                        'personDetails.profilePicture': 1,
                        read: '$chats.read',
                        latestChatText: {
                            $arrayElemAt: ['$chats.chatTexts', -1] // Get the last element of the chatTexts array
                        }
                    }
                },
                { $sort: { 'latestChatText.time': -1 } }
            ]);
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in getMessages, CheckChatExists", error);
        }
    }
    /**
     *
     * @param userId - The ID of the user
     * @param personId - The ID of the person who received message
     * @param message - The message text
     * @param sendByUser - boolean, send by user or not
     */
    async getMessageCount(userId) {
        try {
            const result = await user_schema_1.UserEntity.aggregate([
                { $match: { _id: userId } },
                { $unwind: '$chats' },
                { $match: { 'chats.read': false } },
                { $group: { _id: null, count: { $sum: 1 } } }
            ]);
            return result.length > 0 ? result[0].count : 0;
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in createChat, MessageDataAccess", error);
        }
    }
    /**
     *
     * @param userId - The ID of the user
     * @param personId - The ID of the person who received message
     */
    async markAsRead(userId, personId) {
        try {
            //  Mark as read
            await user_schema_1.UserEntity.findOneAndUpdate({ _id: userId, chats: { $elemMatch: { personId } } }, { $set: { "chats.$.read": true } });
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in markAsRead, MessageDataAccess", error);
        }
    }
}
exports.MessageDataAccess = MessageDataAccess;
