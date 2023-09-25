import { Types } from 'mongoose'
import { UserPostDataAccess } from '../../data/user.postDataAccess'

export class GetUserPostsUseCase {
  private userPostDataAccess: UserPostDataAccess

  constructor() {
    this.userPostDataAccess = new UserPostDataAccess()
  }

  getUserPosts = async (userId: Types.ObjectId, skip: number) => {
    const posts = await this.userPostDataAccess.getUserPosts(userId, skip)
    return posts
  }
}
