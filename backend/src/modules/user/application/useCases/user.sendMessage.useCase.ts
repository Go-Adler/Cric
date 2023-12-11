import { UserDataAccess } from "../../data/user.dataAccess"

export class SendMessageUseCase {
  private userDataAccess: UserDataAccess
  constructor() {
    this.userDataAccess = new UserDataAccess()
  }

  sendMessage = async () => {
    await this.userDataAccess.addMessage()
  }
}