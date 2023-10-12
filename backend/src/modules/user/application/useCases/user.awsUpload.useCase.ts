import { Types } from "mongoose";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";

export class AwsUploadUseCase {
  private awsBucketAccessKey: string;
  private awsBucketSecretAccessKey: string;
  private bucketName: string;
  private bucketRegion: string;

  constructor() {
    this.awsBucketAccessKey = process.env.AWS_BUCKET_ACCESS_KEY!;
    this.awsBucketSecretAccessKey = process.env.AWS_BUCKET_SECRET_ACCESS_KEY!;
    this.bucketName = process.env.AWS_BUCKET_NAME!;
    this.bucketRegion = process.env.AWS_REGION!;
  }

  /**
   * Upload a post image to AWS S3.
   * @param userId - User ID associated with the post.
   * @param imageFile - The image file to upload.
   * @returns The uploaded file's key (filename) or false if the upload fails.
   * @throws Error if there is an issue during the upload process.
   */
  uploadPost = async (userId: Types.ObjectId, imageFile: Express.Multer.File) => {
    try {
      // Create an S3 client
      const s3 = new S3Client({
        credentials: {
          accessKeyId: this.awsBucketAccessKey,
          secretAccessKey: this.awsBucketSecretAccessKey,
        },
        region: this.bucketRegion,
      });

      // Generate a random image name
      const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");
      const fileName = `users/${userId}/posts/${randomImageName()}`;

      // Create a command to put an object in the S3 bucket
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        Body: imageFile?.buffer,
        ContentType: imageFile?.mimetype,
      });

      // Send the command to the S3 client
      const upload = await s3.send(command);

      if (upload.$metadata.httpStatusCode === 200) return fileName;
      return false;
    } catch (error: any) {
      console.error(`Error uploading post image: ${error.message}`);
      throw new Error("Failed to upload to the AWS bucket.");
    }
  };
}
