"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageValidationUseCase = void 0;
const sharp_1 = __importDefault(require("sharp"));
class ImageValidationUseCase {
    constructor() {
        this.validateImage = async (imageFile) => {
            // Use Sharp to create an image from the buffer
            const image = (0, sharp_1.default)(imageFile.buffer);
            // Get image metadata (format, width, height, etc.)
            const metadata = await image.metadata();
            // Check if metadata.format is defined and not null
            if (metadata.format &&
                !['jpeg', 'png', 'webp'].includes(metadata.format.toLowerCase())) {
                return { valid: false, reason: 'Invalid fomat' };
            }
            // Check image dimensions (e.g., width and height)
            const maxWidth = 5000;
            const maxHeight = 5000;
            // Ensure metadata.width and metadata.height are defined
            if (metadata.width === undefined ||
                metadata.height === undefined ||
                metadata.width > maxWidth ||
                metadata.height > maxHeight) {
                return { valid: false, reason: 'Invalid size' };
            }
            return { valid: true };
        };
    }
}
exports.ImageValidationUseCase = ImageValidationUseCase;
