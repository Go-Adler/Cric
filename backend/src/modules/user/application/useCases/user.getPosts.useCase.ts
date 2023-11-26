import { Types } from 'mongoose'
import { UserPostDataAccess } from '../../data/user.postDataAccess'
import { PostResponse } from '../../../../shared/interfaces/userPost.interface'

export class GetUserPostsUseCase {
  private userPostDataAccess: UserPostDataAccess

  constructor() {
    this.userPostDataAccess = new UserPostDataAccess()
  }

  getUserPosts = async (userId: Types.ObjectId, skip: number) => {
    const posts = await this.userPostDataAccess.getUserPosts(userId, skip)
    return posts
  }

  
  getUserPost = async (postId: Types.ObjectId): Promise<PostResponse> => {
    return await this.userPostDataAccess.getUserPost(postId)
  }

}
