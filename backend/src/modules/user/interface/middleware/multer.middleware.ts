import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

export class MulterMiddleware {

  // Create multer storage instance
  storage = multer.memoryStorage();

  // Create a multer middleware instance that handles single file uploads with the field name 'postImage'
  upload = multer({ storage: this.storage }).single('postImage');

  // Middleware function to handle file upload
  memoryStorage = (req: Request, res: Response, next: NextFunction) => {
    try {
      // Use the multer middleware to process the upload
      this.upload(req, res, (err: any) => {
        if (err) {
          // Handle any upload errors here
          return res.status(400).json({ error: 'File upload failed' });
        }
        // The file has been uploaded successfully
        next();
      });
    } catch (error) {
      // Handle other errors
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}