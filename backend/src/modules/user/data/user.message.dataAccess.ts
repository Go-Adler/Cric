import { Types } from "mongoose"

import { UserEntity } from "../domain/user.schema"
import { ErrorHandling } from "../../../utils/handleError.utils"
import { MongoExists } from "../../../shared/interfaces/user.shared.interface"

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
      await UserEntity.findOneAndUpdate({ _id: userId, chats: { $elemMatch: { personId } } }, { $push: { "chats.$.chatTexts": { message, sendByUser } } })
    } catch (error) {
      ErrorHandling.processError("Error in addMessageToChat, MessageDataAccess", error)
    }
  }
}
