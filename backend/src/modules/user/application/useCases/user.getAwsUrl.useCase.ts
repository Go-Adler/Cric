import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { Post, PostResponse } from "../../../../shared/interfaces/userPost.interface"
import { Notification } from '../../../../shared/interfaces/user.notification.interface'
import { ErrorHandling } from "../../../../utils/handleError.utils"
import { ResultMessageList } from "../../../../shared/interfaces/user.messageList.interface"

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
    try {
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
    } catch (error) {
      ErrorHandling.processError('Error in getPostsWithUrl, getAwsUrlUseCase', error)
    }
  }

  getImageUrl = async (image: string) => {
    try {
      const getObjectParams = {
        Bucket: this.bucketName,
        Key: image,
      }
      const command = new GetObjectCommand(getObjectParams)
      const url = await getSignedUrl(this.s3, command, { expiresIn: 10 })
  
      return url
    } catch (error) {
      ErrorHandling.processError('Error in getImageUrl, getAwsUrlUseCase', error)
    }
  }

  getImageUrlUsersFind = async (users: any) => {
    try {
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
    } catch (error) {
      ErrorHandling.processError('Error in getImageUrlUsersFind, getAwsUrlUseCase', error)
    }
  }

  getUrl = async (post: Post | any) => {
    try {
      if (post.content?.multimedia && post.content?.multimedia[0]) {
        const imageName = post?.content?.multimedia[0]
  
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
    } catch (error) {
      ErrorHandling.processError('Error in getUrl, getAwsUrlUseCase', error)
    }
  }

  getNotificationsWithProfileUrl = async (notifications: Notification[]) => {
    try {
      for (const notification of notifications) {
        if (notification?.profilePicture) {
          const imageName = notification.profilePicture
          const getObjectParams = {
            Bucket: this.bucketName,
            Key: imageName,
          }
          const command = new GetObjectCommand(getObjectParams)
          const url = await getSignedUrl(this.s3, command, { expiresIn: 10 })
    
          notification.profilePicture = url
        }
      }
      return notifications
    } catch (error) {
      ErrorHandling.processError('Error in getNotificationsWithProfileUrl, getAwsUrlUseCase', error)
    }
  }

  getPostWithUrl = async (postResponse: PostResponse) => {
    try {
      if (postResponse.profilePicture) {
        const imageName = postResponse.profilePicture
        const getObjectParams = {
          Bucket: this.bucketName,
          Key: imageName,
        }
        const command = new GetObjectCommand(getObjectParams)
        const url = await getSignedUrl(this.s3, command, { expiresIn: 10 })
  
        postResponse.profilePicture = url
      }
  
      if (postResponse.post.content?.multimedia && postResponse.post.content?.multimedia[0]) {
        const imageName = postResponse.post.content.multimedia[0]
        const getObjectParams = {
          Bucket: this.bucketName,
          Key: imageName,
        }
        const command = new GetObjectCommand(getObjectParams)
        const url = await getSignedUrl(this.s3, command, { expiresIn: 10 })
  
        postResponse.post.content.multimedia[0] = url
      }
  
      return postResponse
    } catch (error) {
      ErrorHandling.processError('Error in getPostWithUrl, getAwsUrlUseCase', error)
    }
  }

  getMessageWithUrl = async (messageList: ResultMessageList[]) => {
    try {
      for (const message of messageList) {
        if (message.personDetails && message.personDetails.profilePicture) {
          const imageName = message.personDetails.profilePicture
          const getObjectParams = {
            Bucket: this.bucketName,
            Key: imageName,
          }
          const command = new GetObjectCommand(getObjectParams)
          const url = await getSignedUrl(this.s3, command, { expiresIn: 10 })
    
          message.personDetails.profilePicture = url
        }
      }
      return messageList
    } catch (error) {
      ErrorHandling.processError('Error in getMessageWithUrl, GetAwsUrlCase', error)
    }
  }
}
