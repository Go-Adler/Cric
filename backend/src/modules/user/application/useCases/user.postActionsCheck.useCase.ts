import { Types } from "mongoose"
import { FeedPost, Post } from "../../../../shared/interfaces/userPost.interface"

export class PostActionsUseCase {
  likedPosts = (userId: Types.ObjectId, posts: Post[] | FeedPost[]) => {
    for (const post of posts) {
      const isLiked = (userId: Types.ObjectId, usersLiked: Types.ObjectId[]) => {
        return usersLiked.some(function (element: any) {
          return element.equals(userId)
        })
      }

      const usersLiked = post.usersLiked!
      if (post.engagement && isLiked(userId, usersLiked)) {
        post.engagement.liked = true
      }
    }
    return posts
  }
}
