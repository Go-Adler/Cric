import { UserDataAccess } from "../../data/user.dataAccess"
import { Types } from 'mongoose'

export class SendMessageUseCase {
  private userDataAccess: UserDataAccess
  constructor() {
    this.userDataAccess = new UserDataAccess()
  }

  sendMessage = async (message: string, userId: Types.ObjectId, userName: string) => {
    const sendByUser = true
    const { _id: personId } = await this.userDataAccess.getUserIdWithUserName(userName)
    
    userId = new Types.ObjectId(userId)
    // add message to user
    await this.userDataAccess.addMessage(message, userId, personId, sendByUser)
 
  }
}