import multer from 'multer';
import { Image_storage } from '../configs/multer.config.js';

export const Image_upload = multer({
  storage: Image_storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB max file size
  },
}).single('image');
