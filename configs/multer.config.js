import path from 'path';
import multer from 'multer';

export const Image_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images/');
  },
  filename: function (req, file, cb) {
    const unique_suffix = Date.now() + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + unique_suffix + ext);
  },
});
