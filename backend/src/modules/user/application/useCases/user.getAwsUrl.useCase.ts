import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { Post } from "../../../../shared/interfaces/userPost.interface"
import { Notification } from '../../../../shared/interfaces/user.notification.interface'

export class GetAwsUrlUseCase {
  private awsAccessKey
  private awsSecretAccessKey
  private bucketName
  private bucketRegion
  private s3

  constructor() {
    this.awsAccessKey = process.env.AWS_BUCKET_ACCESS_KEY!
    this.awsSecretAccessKey = process.env.AWS_BUCKET_SECRET_ACCESS_KEY!
    this.bucketName = process.env.AWS_BUCKET_NAME!
    this.bucketRegion = process.env.AWS_REGION!

    this.s3 = new S3Client({
      credentials: {
        accessKeyId: this.awsAccessKey,
        secretAccessKey: this.awsSecretAccessKey,
      },
      region: this.bucketRegion,
    })
  }

  getPostsWithUrl = async (posts: Post[]) => {
    for (const post of posts) {
      if (post.content && post.content.multimedia && post.content.multimedia[0]) {
        const getObjectParams = {
          Bucket: this.bucketName,
          Key: post.content.multimedia[0],
        }
        const command = new GetObjectCommand(getObjectParams)
        const url = await getSignedUrl(this.s3, command, { expiresIn: 10 })
        post.content.multimedia[0] = url
      }
    }

    return posts
  }

  getImageUrl = async (image: string) => {
    const getObjectParams = {
      Bucket: this.bucketName,
      Key: image,
    }
    const command = new GetObjectCommand(getObjectParams)
    const url = await getSignedUrl(this.s3, command, { expiresIn: 10 })

    return url
  }

  getImageUrlUsersFind = async (users: any) => {
    for (const user of users) {
      if (user.profilePicture) {
        const getObjectParams = {
          Bucket: this.bucketName,
          Key: user.profilePicture,
        }
        const command = new GetObjectCommand(getObjectParams)
        const url = await getSignedUrl(this.s3, command, { expiresIn: 10 })
        user.profilePicture = url
      }
    }
    return users
  }

  getUrl = async (post: Post | any) => {
    if (post.content?.multimedia && post.content?.multimedia[0]) {
      const imageName = post?.content?.multimedia[0]!

      const getObjectParams = {
        Bucket: this.bucketName,
        Key: imageName,
      }
      const command = new GetObjectCommand(getObjectParams)
      const url = await getSignedUrl(this.s3, command, { expiresIn: 10 })

      post.content.multimedia[0] = url
      return post
    } else {
      return post
    }
  }

  getNotificationsWithProfileUrl = async (notifications: Notification[]) => {
    for (const notification of notifications) {
      const imageName = notification.profilePicture
      const getObjectParams = {
        Bucket: this.bucketName,
        Key: imageName,
      }
      const command = new GetObjectCommand(getObjectParams)
      const url = await getSignedUrl(this.s3, command, { expiresIn: 10 })

      notification.profilePicture = url
    }
    return notifications
  }
}
