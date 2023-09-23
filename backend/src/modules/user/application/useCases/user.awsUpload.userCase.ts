import { Types } from "mongoose"
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import crypto from 'crypto'

export class AwsUploadUseCase {

  constructor() {
  }

  uploadPost = async (userId: Types.ObjectId , imageFile:Express.Multer.File | undefined) => {
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

    const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')
    const fileName = `users/${userId}/posts/${randomImageName()}`

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: imageFile?.buffer,
      ContentType: imageFile?.mimetype
    })

    const upload = await s3.send(command)
    
    if (upload.$metadata.httpStatusCode === 200) return true
    return false
  }
}
