import Swipe_preference_image from '../models/swipe_preference_image.model.js';
import { BASE_URL } from '../configs/dotenv.config.js';

export const upload_swipe_preference_image = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(200).json({
        status_code: 400,
        message: 'No file uploaded',
      });
    }

    const image_url = `${BASE_URL}/api/images/${file.filename}`;
    const new_image = await Swipe_preference_image.create({ image_url });
    return res.status(200).json({
      status_code: 200,
      message: 'Image uploaded successfully',
      data: new_image,
    });
  } catch (error) {
    console.error('Error in uploading swipe preference image', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export const get_swipe_preference_images = async (req, res) => {
  try {
    const images = await Swipe_preference_image.findAll({});
    if (images.length === 0) {
      return res.status(200).json({
        status_code: 404,
        message: 'No data found for swipe preference images',
      });
    }
    return res.status(200).json({
      status_code: 200,
      message: 'Data found',
      data: images,
    });
  } catch (error) {
    console.error('Error in getting swipe preference images', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
