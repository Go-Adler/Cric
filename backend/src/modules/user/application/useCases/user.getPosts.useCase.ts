import { UserPostDataAccess } from "../../data/user.postDataAccess"

export class GetUserPostsUseCase {
  private userPostDataAccess: UserPostDataAccess

  constructor() {
    this.userPostDataAccess = new UserPostDataAccess()
  }

  getUserPosts = async (email: string): Promise<any> => {
    const posts =  await this.userPostDataAccess.getUserPosts(email)
    return posts
  }
}