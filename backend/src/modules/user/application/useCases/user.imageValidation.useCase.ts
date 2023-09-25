import sharp from 'sharp'

export class ImageValidationUseCase {
  validateImage = async (imageFile: Express.Multer.File) => {
    // Use Sharp to create an image from the buffer
    const image = sharp(imageFile.buffer)

    // Get image metadata (format, width, height, etc.)
    const metadata = await image.metadata()

    // Check if metadata.format is defined and not null
    if (
      metadata.format &&
      !['jpeg', 'png', 'webp'].includes(metadata.format.toLowerCase())
    ) {
      return { valid: false, reason: 'Invalid fomat' }
    }

    // Check image dimensions (e.g., width and height)
    const maxWidth = 3000
    const maxHeight = 3000

    // Ensure metadata.width and metadata.height are defined
    if (
      metadata.width === undefined ||
      metadata.height === undefined ||
      metadata.width > maxWidth ||
      metadata.height > maxHeight
    ) {
      return { valid: false, reason: 'Invalid size' }
    }

    return { valid: true }
  }
}
