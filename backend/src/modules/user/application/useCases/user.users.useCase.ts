import { UserDataAccess } from "../../data/user.dataAccess"

export class UsersUseCase {
  private userDataAccess: UserDataAccess

  constructor() {
    this.userDataAccess = new UserDataAccess()
  }

  async findUsers(input: string) {
    const users = await this.userDataAccess.findUsers(input)
    return users
  }
}