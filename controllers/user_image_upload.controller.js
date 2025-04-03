import User_image_upload from '../models/user_image_upload.model.js';
import { BASE_URL } from '../configs/dotenv.config.js';
import User from '../models/user.model.js';

export const create_user_image_upload = async (req, res) => {
  try {
    const { user_id } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(200).json({
        status_code: 400,
        message: 'Image is required.',
      });
    }
    if (!user_id) {
      return res.status(200).json({
        status_code: 400,
        message: 'User ID is required.',
      });
    }
    const image_url = `${BASE_URL}/api/images/${file.filename}`;
    const existing_image = await User_image_upload.findOne({
      where: { user_id },
    });
    if (existing_image) {
      return res.status(200).json({
        status_code: 409,
        message: 'User image already exists.',
      });
    }
    const user_image_upload = await User_image_upload.create({
      user_id,
      image_url,
    });
    return res.status(200).json({
      status_code: 200,
      message: 'User image upload created successfully',
      data: user_image_upload,
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'Error creating user image upload',
      error: error.message,
    });
  }
};

export const get_all_users_image_uploads = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: User_image_upload,
          attributes: ['image_url'],
        },
      ],
    });
    // Transform the data to match the desired structure.
    const transformed_users = users.map((user) => {
      // const images = (user.User_image_upload || []).map((pref) => ({
      //   image_url: pref.User_image_upload?.image_url || '',
      // }));
      const image_url = user.User_image_upload?.image_url || "";

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        is_active: user.is_active,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        image_url: image_url,
      };
    });
    return res.status(200).json({
      status_code: 200,
      message: 'User image uploads retrieved successfully',
      data: transformed_users,
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'Error retrieving user image uploads',
      error: error.message,
    });
  }
};
