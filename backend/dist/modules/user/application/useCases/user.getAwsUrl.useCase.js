"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAwsUrlUseCase = void 0;
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const client_s3_1 = require("@aws-sdk/client-s3");
const handleError_utils_1 = require("../../../../utils/handleError.utils");
class GetAwsUrlUseCase {
    constructor() {
        this.getPostsWithUrl = async (posts) => {
            try {
                for (const post of posts) {
                    if (post.content && post.content.multimedia && post.content.multimedia[0]) {
                        const getObjectParams = {
                            Bucket: this.bucketName,
                            Key: post.content.multimedia[0],
                        };
                        const command = new client_s3_1.GetObjectCommand(getObjectParams);
                        const url = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: 10 });
                        post.content.multimedia[0] = url;
                    }
                    if (post.personDetails && post.personDetails.profilePicture) {
                        const getObjectParams = {
                            Bucket: this.bucketName,
                            Key: post.personDetails.profilePicture,
                        };
                        const command = new client_s3_1.GetObjectCommand(getObjectParams);
                        const url = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: 10 });
                        post.personDetails.profilePicture = url;
                    }
                }
                return posts;
            }
            catch (error) {
                handleError_utils_1.ErrorHandling.processError('Error in getPostsWithUrl, getAwsUrlUseCase', error);
            }
        };
        this.getFeedPostsWithUrl = async (posts) => {
            try {
                for (const post of posts) {
                    if (post.content && post.content.multimedia && post.content.multimedia[0]) {
                        const getObjectParams = {
                            Bucket: this.bucketName,
                            Key: post.content.multimedia[0],
                        };
                        const command = new client_s3_1.GetObjectCommand(getObjectParams);
                        const url = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: 10 });
                        post.content.multimedia[0] = url;
                    }
                    if (post.profilePicture) {
                        const getObjectParams = {
                            Bucket: this.bucketName,
                            Key: post.profilePicture,
                        };
                        const command = new client_s3_1.GetObjectCommand(getObjectParams);
                        const url = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: 10 });
                        post.profilePicture = url;
                    }
                }
                return posts;
            }
            catch (error) {
                handleError_utils_1.ErrorHandling.processError('Error in getPostsWithUrl, getAwsUrlUseCase', error);
            }
        };
        this.getImageUrl = async (image) => {
            try {
                const getObjectParams = {
                    Bucket: this.bucketName,
                    Key: image,
                };
                const command = new client_s3_1.GetObjectCommand(getObjectParams);
                const url = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: 10 });
                return url;
            }
            catch (error) {
                handleError_utils_1.ErrorHandling.processError('Error in getImageUrl, getAwsUrlUseCase', error);
            }
        };
        this.getImageUrlUsersFind = async (users) => {
            try {
                for (const user of users) {
                    if (user.profilePicture) {
                        const getObjectParams = {
                            Bucket: this.bucketName,
                            Key: user.profilePicture,
                        };
                        const command = new client_s3_1.GetObjectCommand(getObjectParams);
                        const url = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: 10 });
                        user.profilePicture = url;
                    }
                }
                return users;
            }
            catch (error) {
                handleError_utils_1.ErrorHandling.processError('Error in getImageUrlUsersFind, getAwsUrlUseCase', error);
            }
        };
        this.getUrl = async (post) => {
            try {
                if (post.content?.multimedia && post.content?.multimedia[0]) {
                    const imageName = post?.content?.multimedia[0];
                    const getObjectParams = {
                        Bucket: this.bucketName,
                        Key: imageName,
                    };
                    const command = new client_s3_1.GetObjectCommand(getObjectParams);
                    const url = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: 10 });
                    post.content.multimedia[0] = url;
                    return post;
                }
                else {
                    return post;
                }
            }
            catch (error) {
                handleError_utils_1.ErrorHandling.processError('Error in getUrl, getAwsUrlUseCase', error);
            }
        };
        this.getNotificationsWithProfileUrl = async (notifications) => {
            try {
                for (const notification of notifications) {
                    if (notification?.profilePicture) {
                        const imageName = notification.profilePicture;
                        const getObjectParams = {
                            Bucket: this.bucketName,
                            Key: imageName,
                        };
                        const command = new client_s3_1.GetObjectCommand(getObjectParams);
                        const url = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: 10 });
                        notification.profilePicture = url;
                    }
                }
                return notifications;
            }
            catch (error) {
                handleError_utils_1.ErrorHandling.processError('Error in getNotificationsWithProfileUrl, getAwsUrlUseCase', error);
            }
        };
        this.getPostWithUrl = async (postResponse) => {
            try {
                if (postResponse.profilePicture) {
                    const imageName = postResponse.profilePicture;
                    const getObjectParams = {
                        Bucket: this.bucketName,
                        Key: imageName,
                    };
                    const command = new client_s3_1.GetObjectCommand(getObjectParams);
                    const url = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: 10 });
                    postResponse.profilePicture = url;
                }
                if (postResponse.post.content?.multimedia && postResponse.post.content?.multimedia[0]) {
                    const imageName = postResponse.post.content.multimedia[0];
                    const getObjectParams = {
                        Bucket: this.bucketName,
                        Key: imageName,
                    };
                    const command = new client_s3_1.GetObjectCommand(getObjectParams);
                    const url = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: 10 });
                    postResponse.post.content.multimedia[0] = url;
                }
                return postResponse;
            }
            catch (error) {
                handleError_utils_1.ErrorHandling.processError('Error in getPostWithUrl, getAwsUrlUseCase', error);
            }
        };
        this.getMessageWithUrl = async (messageList) => {
            try {
                for (const message of messageList) {
                    if (message.personDetails && message.personDetails.profilePicture) {
                        const imageName = message.personDetails.profilePicture;
                        const getObjectParams = {
                            Bucket: this.bucketName,
                            Key: imageName,
                        };
                        const command = new client_s3_1.GetObjectCommand(getObjectParams);
                        const url = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: 10 });
                        message.personDetails.profilePicture = url;
                    }
                }
                return messageList;
            }
            catch (error) {
                handleError_utils_1.ErrorHandling.processError('Error in getMessageWithUrl, GetAwsUrlCase', error);
            }
        };
        this.getFriendWithUrl = async (friends) => {
            try {
                for (const friend of friends) {
                    if (friend.profilePicture) {
                        const imageName = friend.profilePicture;
                        const getObjectParams = {
                            Bucket: this.bucketName,
                            Key: imageName,
                        };
                        const command = new client_s3_1.GetObjectCommand(getObjectParams);
                        const url = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: 10 });
                        friend.profilePicture = url;
                    }
                }
                return friends;
            }
            catch (error) {
                handleError_utils_1.ErrorHandling.processError('Error in getMessageWithUrl, GetAwsUrlCase', error);
            }
        };
        this.awsAccessKey = process.env.AWS_BUCKET_ACCESS_KEY;
        this.awsSecretAccessKey = process.env.AWS_BUCKET_SECRET_ACCESS_KEY;
        this.bucketName = process.env.AWS_BUCKET_NAME;
        this.bucketRegion = process.env.AWS_REGION;
        this.s3 = new client_s3_1.S3Client({
            credentials: {
                accessKeyId: this.awsAccessKey,
                secretAccessKey: this.awsSecretAccessKey,
            },
            region: this.bucketRegion,
        });
    }
}
exports.GetAwsUrlUseCase = GetAwsUrlUseCase;
