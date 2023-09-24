import { Types } from "mongoose"
import { UserPostDataAccess } from "../../data/user.postDataAccess"
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { PostDocumentComplete } from "../../../../shared/interfaces/userPost.interface"


export class GetUserPostsUseCase {
  private userPostDataAccess: UserPostDataAccess

  constructor() {
    this.userPostDataAccess = new UserPostDataAccess()
  }

  getUserPosts = async (userId: Types.ObjectId, skip: number ) => {
    const awsAccessKey = process.env.AWS_ACCESS_KEY!
    const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!
    const bucketName = process.env.BUCKET_NAME!
    const bucketRegion = process.env.BUCKET_REGION!

    const s3 = new S3Client({
      credentials: {
        accessKeyId: awsAccessKey,
        secretAccessKey: awsSecretAccessKey
      },
      region: bucketRegion
    })

    const posts =  await this.userPostDataAccess.getUserPosts(userId, skip)

    for (const post of posts) {
      
    }

    return posts
  }
}