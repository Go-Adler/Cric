import { Types } from "mongoose"

import { UserEntity } from "../domain/user.schema"
import { ErrorHandling } from "../../../utils/handleError.utils"
import { MongoExists } from "../../../shared/interfaces/user.shared.interface"
import { ResultMessageList } from "../../../shared/interfaces/user.messageList.interface"

export class MessageDataAccess {
  /**
   * Method to check if a chat exist or not
   *
   * @param userId - The ID of the user
   * @param personId - The ID of the person
   * @returns userId if exists or null if not exists
   */
  async checkChatExists(userId: Types.ObjectId, personId: Types.ObjectId): Promise<MongoExists | null> {
    try {
      return await UserEntity.exists({ _id: userId, chats: { $elemMatch: { personId } } })
    } catch (error) {
      ErrorHandling.processError("Error in checkChatExists, MessageDataAccess", error)
    }
  }

  /**
   *
   * @param userId - The ID of the user
   * @param personId - The ID of the person who received message
   * @param message - The message text
   * @param sendByUser - boolean, send by user or not
   */
  async createChat(userId: Types.ObjectId, personId: Types.ObjectId, message: string, sendByUser: boolean) {
    try {
      await UserEntity.findOneAndUpdate(userId, { $push: { chats: { personId, chatTexts: [{ message, sendByUser }] } } }, { new: true })
    } catch (error) {
      ErrorHandling.processError("Error in createChat, MessageDataAccess", error)
    }
  }

  /**
   *
   * @param userId - The ID of the user
   * @param personId - The ID of the person who received message
   * @param message - The message text
   * @param sendByUser - boolean, send by user or not
   */
  async addMessageToChat(userId: Types.ObjectId, personId: Types.ObjectId, message: string, sendByUser: boolean) {
    try {
      // Mark as unread
      await UserEntity.findOneAndUpdate(
        { _id: userId, chats: { $elemMatch: { personId } } }, { $set: { "chats.$.read": false } } 
      )
      
      // Add message
      await UserEntity.findOneAndUpdate({ _id: userId, chats: { $elemMatch: { personId } } }, { $push: { "chats.$.chatTexts": { message, sendByUser } } })
    } catch (error) {
      ErrorHandling.processError("Error in addMessageToChat, MessageDataAccess", error)
    }
  }

  async getMessages(userId: Types.ObjectId, personId: Types.ObjectId) {
    try {
      //  Mark as read
      await UserEntity.findOneAndUpdate(
        { _id: userId, chats: { $elemMatch: { personId } } }, { $set: { "chats.$.read": true } } 
      )

      // Get messages
      const result = await UserEntity.aggregate([
        { $match: { _id: new Types.ObjectId(userId) } },
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
      ])
      return result[0].chats
    } catch (error) {
      ErrorHandling.processError("Error in getMessages, CheckChatExists", error)
    }
  }

  async getMessagesList(userId: Types.ObjectId): Promise<ResultMessageList[]> {
    try {
      return await UserEntity.aggregate([
        { $match: { _id: new Types.ObjectId(userId) } },
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
      ])
    } catch (error) {
      ErrorHandling.processError("Error in getMessages, CheckChatExists", error)
    }
  }

  /**
   *
   * @param userId - The ID of the user
   * @param personId - The ID of the person who received message
   * @param message - The message text
   * @param sendByUser - boolean, send by user or not
   */
  async getMessageCount(userId: Types.ObjectId) {
    try {
      const result = await UserEntity.aggregate([
        { $match: { _id: userId } },
        { $unwind: '$chats' },
        { $match: { 'chats.read': false } },
        { $group: { _id: null, count: { $sum: 1 } } }
      ])

      return result.length > 0 ? result[0].count : 0
      
    } catch (error) {
      ErrorHandling.processError("Error in createChat, MessageDataAccess", error)
    }
  }
}
