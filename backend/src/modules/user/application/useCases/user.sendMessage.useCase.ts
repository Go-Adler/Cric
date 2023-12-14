import { Types } from 'mongoose'

import { UserDataAccess } from '../../data/user.dataAccess'
import { ErrorHandling } from '../../../../utils/handleError.utils'
import { MessageDataAccess } from '../../data/user.message.dataAccess'

export class SendMessageUseCase {
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
  sendMessage = async (message: string, userId: Types.ObjectId, userName: string) => {
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
    } catch (error) {
      ErrorHandling.processError('Error in sendMessage, SendMessageUseCase', Error)
    }
  }
}