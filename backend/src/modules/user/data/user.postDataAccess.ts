import { UserEntity } from "../domain/user.schema";
import { PostDocument } from "../../../shared/interfaces/userPost.interface";

export class UserPostDataAccess {
  // create a new post
  async createPost(email: string, postData: PostDocument) {
    await UserEntity.findOneAndUpdate({email}, { $push: { posts: postData }})
  }

  async getUserPosts(email: string) {
    const posts = await UserEntity.find({email}).select('-_id posts')
    return posts[0].posts
  }
}