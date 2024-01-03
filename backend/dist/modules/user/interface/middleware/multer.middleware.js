"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
class MulterMiddleware {
    constructor() {
        // Create multer storage instance
        this.storage = multer_1.default.memoryStorage();
        // Create a multer middleware instance that handles single file uploads with the field name 'postImage'
        this.upload = (0, multer_1.default)({ storage: this.storage }).single('postImage');
        this.uploadProfile = (0, multer_1.default)({ storage: this.storage }).single('file');
        // Middleware function to handle file upload
        this.memoryStorage = (req, res, next) => {
            try {
                // Use the multer middleware to process the upload
                this.upload(req, res, (err) => {
                    if (err) {
                        // Handle any upload errors here
                        return res.status(400).json({ error: 'File upload failed' });
                    }
                    // The file has been uploaded successfully
                    next();
                });
            }
            catch (error) {
                // Handle other errors
                return res.status(500).json({ error: 'Internal server error' });
            }
        };
        this.memoryStorageProfile = (req, res, next) => {
            try {
                // Use the multer middleware to process the upload
                this.uploadProfile(req, res, (err) => {
                    if (err) {
                        // Handle any upload errors here
                        return res.status(400).json({ error: 'File upload failed' });
                    }
                    // The file has been uploaded successfully
                    next();
                });
            }
            catch (error) {
                // Handle other errors
                return res.status(500).json({ error: 'Internal server error' });
            }
        };
    }
}
exports.MulterMiddleware = MulterMiddleware;
