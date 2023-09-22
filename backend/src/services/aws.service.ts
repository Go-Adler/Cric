import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

export class AwsService {
  awsUploadService = async (file:an) => {
    const accessKey = process.env.AWS_ACCESS_KEY
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
    const bucketName = process.env.BUCKET_NAME
    const bucketRegion = process.env.BUCKET_REGION
  
    const s3 = new S3Client({
      accessKeyId: accessKey,
      credentials: {
        secretAccessKey: secretAccessKey,
      },
      region: bucketRegion,
    })
  
    const params = {
      Bucket: bucketName,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype
    }
  
    const command = new PutObjectCommand(params)
  
    await s3.send(command)
  }
}


