"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsUploadUseCase = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const crypto_1 = __importDefault(require("crypto"));
class AwsUploadUseCase {
    constructor() {
        /**
         * Upload a post image to AWS S3.
         * @param userId - User ID associated with the post.
         * @param imageFile - The image file to upload.
         * @returns The uploaded file's key (filename) or false if the upload fails.
         * @throws Error if there is an issue during the upload process.
         */
        this.uploadPost = async (userId, imageFile) => {
            try {
                // Create an S3 client
                const s3 = new client_s3_1.S3Client({
                    credentials: {
                        accessKeyId: this.awsBucketAccessKey,
                        secretAccessKey: this.awsBucketSecretAccessKey,
                    },
                    region: this.bucketRegion,
                });
                // Generate a random image name
                const randomImageName = (bytes = 32) => crypto_1.default.randomBytes(bytes).toString("hex");
                const fileName = `users/${userId}/posts/${randomImageName()}`;
                // Create a command to put an object in the S3 bucket
                const command = new client_s3_1.PutObjectCommand({
                    Bucket: this.bucketName,
                    Key: fileName,
                    Body: imageFile?.buffer,
                    ContentType: imageFile?.mimetype,
                });
                // Send the command to the S3 client
                const upload = await s3.send(command);
                if (upload.$metadata.httpStatusCode === 200)
                    return fileName;
                return false;
            }
            catch (error) {
                console.error(`Error uploading post image: ${error.message}`);
                throw new Error("Failed to upload to the AWS bucket.");
            }
        };
        this.uploadProfilePicture = async (userId, imageFile) => {
            try {
                // Create an S3 client
                const s3 = new client_s3_1.S3Client({
                    credentials: {
                        accessKeyId: this.awsBucketAccessKey,
                        secretAccessKey: this.awsBucketSecretAccessKey,
                    },
                    region: this.bucketRegion,
                });
                // Generate a random image name
                const randomImageName = (bytes = 32) => crypto_1.default.randomBytes(bytes).toString("hex");
                const fileName = `users/${userId}/profilePicture/${randomImageName()}`;
                // Create a command to put an object in the S3 bucket
                const command = new client_s3_1.PutObjectCommand({
                    Bucket: this.bucketName,
                    Key: fileName,
                    Body: imageFile?.buffer,
                    ContentType: imageFile?.mimetype,
                });
                // Send the command to the S3 client
                const upload = await s3.send(command);
                if (upload.$metadata.httpStatusCode === 200)
                    return fileName;
                return false;
            }
            catch (error) {
                console.error(`Error uploading post image: ${error.message}`);
                throw new Error("Failed to upload to the AWS bucket.");
            }
        };
        this.awsBucketAccessKey = process.env.AWS_BUCKET_ACCESS_KEY;
        this.awsBucketSecretAccessKey = process.env.AWS_BUCKET_SECRET_ACCESS_KEY;
        this.bucketName = process.env.AWS_BUCKET_NAME;
        this.bucketRegion = process.env.AWS_REGION;
    }
}
exports.AwsUploadUseCase = AwsUploadUseCase;
