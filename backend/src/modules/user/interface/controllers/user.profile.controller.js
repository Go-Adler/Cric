"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileController = void 0;
const user_profile_userCase_1 = require("../../application/useCases/user.profile.userCase");
const user_awsUpload_useCase_1 = require("../../application/useCases/user.awsUpload.useCase");
const user_imageValidation_useCase_1 = require("../../application/useCases/user.imageValidation.useCase");
const user_getAwsUrl_useCase_1 = require("../../application/useCases/user.getAwsUrl.useCase");
// Define the controller class for user new post
class UserProfileController {
    // Initialize the fields in the constructor
    constructor() {
        // Define the method for user new post
        this.updateProfilePicture = async (req, res, next) => {
            try {
                // Get the user id and the text from the request
                const { userId } = req.user;
                // Get the image file from the request
                const imageFile = req.file;
                // Initialize the multimedia field
                let profilePicture = '';
                // If image exists, validate and upload it
                if (imageFile) {
                    // Validate the image using the use case
                    const isImageValid = await this.imageValidationUseCase.validateImage(imageFile);
                    // If image is invalid, send error response
                    if (!isImageValid.valid) {
                        res.json({ uploadFailed: true, message: isImageValid.reason });
                        return;
                    }
                    // Upload the image to aws bucket using the use case
                    const uploadInfo = await this.awsUploadUseCase.uploadProfilePicture(userId, imageFile);
                    // If upload failed, send error response
                    if (!uploadInfo) {
                        res.json({ uploadFailed: true });
                        return;
                    }
                    // Set the multimedia field to the file name
                    profilePicture = uploadInfo;
                }
                // Create the post without url using the use case
                await this.userProfileUseCase.updateProfilePicture(userId, profilePicture);
                profilePicture = await this.getAwsUrlUseCase.getImageUrl(profilePicture);
                // Send the post as response to the client
                res.json({ profilePicture });
            }
            catch (error) {
                // Pass the error to the next middleware
                next(error);
            }
        };
        this.userProfileUseCase = new user_profile_userCase_1.UserProfileUseCase();
        this.imageValidationUseCase = new user_imageValidation_useCase_1.ImageValidationUseCase();
        this.awsUploadUseCase = new user_awsUpload_useCase_1.AwsUploadUseCase();
        this.getAwsUrlUseCase = new user_getAwsUrl_useCase_1.GetAwsUrlUseCase();
    }
}
exports.UserProfileController = UserProfileController;
