import User from '../models/user.model.js';

export const update_user = async (req, res) => {
  const user = req.user;

  try {
    const { username, mobile, image_url } = req.body;

    // Check if user exists
    const user_data = await User.findOne({
      where: {
        id: user.id,
        email: user.email,
      },
    });

    if (!user_data) {
      return res.status(200).json({
        status_code: 404,
        message: 'User not found',
      });
    }

    const update_fields = {};
    if (username !== undefined) {
      update_fields.username = username === '' ? user.username.trim() : username.trim();
    }
    if (mobile !== undefined) {
      update_fields.mobile = mobile === '' ? '' : mobile.trim();
    }
    if (image_url !== undefined) {
      update_fields.image_url = image_url === '' ? '' : image_url.trim();
    }

    if (Object.keys(update_fields).length === 0) {
      return res.status(200).json({
        status_code: 400,
        message: 'No fields provided for update',
      });
    }

    await User.update(update_fields, {
      where: {
        id: user.id,
        email: user.email,
      },
    });

    // Get updated user data
    const updated_user = await User.findOne({
      where: { id: user.id },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });

    return res.status(200).json({
      status_code: 200,
      message: 'User updated successfully',
      data: updated_user,
    });
  } catch (error) {
    console.error('Error updating user: ', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

export const get_profile = async (req, res) => {
  const user = req.user;

  try {
    const user_data = await User.findOne({
      where: {
        id: user.id, // Using user from req.user
        email: user.email,
      },
      attributes: {
        exclude: ['passowrd'],
      },
    });

    if (!user_data) {
      return res.status(200).json({
        status_code: 404,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      status_code: 200,
      message: 'User found',
      data: user_data,
    });
  } catch (error) {
    console.error('Error getting user profile: ', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
};
