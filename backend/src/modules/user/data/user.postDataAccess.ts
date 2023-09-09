import { UserEntity } from '../domain/user.schema'
import { PostDocument } from '../../../shared/interfaces/userPost.interface'

export class UserPostDataAccess {
  // Create a new post for a user
  async createPost(email: string, postData: PostDocument) {
    // Find the user by their email and push the new post data into the 'posts' array
    await UserEntity.findOneAndUpdate({ email }, { $push: { posts: postData } })
  }

  // Get posts for a specific user
  async getUserPosts(email: string) {
    // Find the user by their email and retrieve the 'posts' array, excluding '_id' field
    const user = await UserEntity.findOne({ email }).select('posts')
    let posts: any = user?.posts || []

    // Sort the posts array in descending order based on the 'timestamp' field
    posts.sort((a: any, b: any) => b.metrics.timestamp - a.metrics.timestamp)

    // Return the sorted 'posts' array from the retrieved user document
    return posts
  }
}
