import { UserPostDataAccess } from '../../data/user.postDataAccess'

export class userPostsUseCase {
  private userPostDataAccess: UserPostDataAccess

  constructor() {
    this.userPostDataAccess = new UserPostDataAccess()
  }
}
