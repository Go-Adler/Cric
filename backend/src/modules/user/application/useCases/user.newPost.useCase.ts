import { Types } from "mongoose" 
import { Post } from "../../../../shared/interfaces/userPost.interface"
import { UserPostDataAccess } from "../../data/user.postDataAccess"

export class CreatePostUseCase {
  private userPostDataAccess: UserPostDataAccess

  constructor() {
    this.userPostDataAccess = new UserPostDataAccess()
  }

  createPost = async (userId: Types.ObjectId, postData: Post) => {
    const post = await this.userPostDataAccess.createPost(userId, postData)
    return post
  }
}
