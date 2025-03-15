import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const Image_upload_dir = path.join(__dirname, '../uploads/images');

if (!fs.existsSync(Image_upload_dir)) {
  fs.mkdirSync(Image_upload_dir, { recursive: true });
  console.log('Uploads folder created:', Image_upload_dir);
}
