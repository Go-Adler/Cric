import { Types } from "mongoose"
import { Post } from "../../../../shared/interfaces/userPost.interface"
import { UserPostDataAccess } from "../../data/user.postDataAccess"

export class CommentPostUseCase {
  private userPostDataAccess: UserPostDataAccess

  constructor() {
    this.userPostDataAccess = new UserPostDataAccess()
  }

  createComment = async (postId: Types.ObjectId, commentData: Post) => {
    const comment = await this.userPostDataAccess.comment(postId, commentData)
    return comment
  }

  getComments = async (postId: Types.ObjectId, skip: number) => {
    const posts = await this.userPostDataAccess.getComments(postId, skip)
    return posts
  }
}
