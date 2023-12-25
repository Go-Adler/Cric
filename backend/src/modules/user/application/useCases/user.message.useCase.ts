import { Types } from 'mongoose'

import { UserDataAccess } from '../../data/user.dataAccess'
import { ErrorHandling } from '../../../../utils/handleError.utils'
import { MessageDataAccess } from '../../data/user.message.dataAccess'
import { ResultMessageList } from '../../../../shared/interfaces/user.messageList.interface'

export class MessageUseCase {
  private messageDataAccess: MessageDataAccess
  private userDataAccess: UserDataAccess

  constructor() {
    this.messageDataAccess = new MessageDataAccess()
    this.userDataAccess = new UserDataAccess()
  }

  /**
   * 
   * @param message - The message content
   * @param userId - The ID of the user
   * @param userName - The userName of the person who receives message
   */
  sendMessage = async (message: string, userId: Types.ObjectId, userName: string): Promise<string> => {
    try {
      // get person Id with user name
      const { _id: personId } = await this.userDataAccess.getUserIdWithUserName(userName)
      
      // add to user
      userId = new Types.ObjectId(userId)
      let sendByUser = true
      let chatExists = await this.messageDataAccess.checkChatExists(userId, personId)
      if (chatExists) {
        await this.messageDataAccess.addMessageToChat(userId, personId, message, sendByUser)
      } else {
        await this.messageDataAccess.createChat(userId, personId, message, sendByUser)
      }

      // add to person
      sendByUser = false
      chatExists = await this.messageDataAccess.checkChatExists(personId, userId)
      if (chatExists) {
        await this.messageDataAccess.addMessageToChat(personId, userId, message, sendByUser)
      } else {
        await this.messageDataAccess.createChat(personId, userId, message, sendByUser)
      }

      return personId
    } catch (error) {
      ErrorHandling.processError('Error in sendMessage, SendMessageUseCase', Error)
    }
  }

  getMessages = async (userId: Types.ObjectId, userName: string) => {
    try {
      const { _id: personId } = await this.userDataAccess.getUserIdWithUserName(userName)
      
      const chatExists = await this.messageDataAccess.checkChatExists(userId, personId)

      if (!chatExists) return []
      return await this.messageDataAccess.getMessages(userId, personId)
    } catch (error) {
      ErrorHandling.processError('Error in getMessages, MessageUseCase', error)
    }
  }

  getMessagesList = async (userId: Types.ObjectId): Promise<ResultMessageList[]> => {
    try {
      return await this.messageDataAccess.getMessagesList(userId)

    } catch (error) {
      ErrorHandling.processError('Error in getMessages, MessageUseCase', error)
    }
  }
  
  getMessageCount = async (userId: Types.ObjectId): Promise<any> => {
    try {
      return await this.messageDataAccess.getMessageCount(userId)

    } catch (error) {
      ErrorHandling.processError('Error in getMessages, MessageUseCase', error)
    }
  }

  markAsRead = async (userId: Types.ObjectId, userName: string): Promise<any> => {
    try {
      const { _id: personId } = await this.userDataAccess.getUserIdWithUserName(userName)
      await this.messageDataAccess.markAsRead(userId, personId)

    } catch (error) {
      ErrorHandling.processError('Error in markAsRead, MessageUseCase', error)
    }
  }
}