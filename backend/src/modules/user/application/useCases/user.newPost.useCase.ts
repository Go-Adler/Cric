import { PostDocument } from "../../../../shared/interfaces/userPost.interface"
import { UserPostDataAccess } from "../../data/user.postDataAccess"

export class CreatePostUseCase {
  private userPostDataAccess: UserPostDataAccess

  constructor() {
    this.userPostDataAccess = new UserPostDataAccess()
  }

  createPost = async (email: string, postData: PostDocument) => {
    const posts = this.userPostDataAccess.createPost(email, postData)
    return posts
  }
}
