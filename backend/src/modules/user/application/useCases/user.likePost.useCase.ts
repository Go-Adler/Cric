import { Types } from 'mongoose'
import { UserPostDataAccess } from '../../data/user.postDataAccess'

export class LikePostUseCase {
  private userPostDataAccess: UserPostDataAccess

  constructor() {
    this.userPostDataAccess = new UserPostDataAccess()
  }

  likePost = async (userId: Types.ObjectId, postId: Types.ObjectId) => {
    // const posts = await this.userPostDataAccess.likePost(userId, postId)
    // return posts
  }
}
