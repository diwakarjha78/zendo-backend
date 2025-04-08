import User from '../../../models/user.model.js';
import { BASE_URL } from '../../../configs/dotenv.config.js';

export const update_user = async (req, res) => {
  const user = req.user;

  try {
    const { username, mobile } = req.body;
    const file = req.file;

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
    if (file) {
      update_fields.image_url = `${BASE_URL}/api/images/${file.filename}`;
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
        exclude: ['password'],
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

export const soft_delete_user = async (req, res) => {
  try {
    const target_user_id = req.query.userId ? req.query.userId : req.user.id;
    const where_condition = req.query.userId ? { id: target_user_id } : { id: target_user_id, email: req.user.email };

    const user_data = await User.findOne({
      where: where_condition,
      attributes: { exclude: ['password'] },
    });

    if (!user_data) {
      return res.status(200).json({
        status_code: 404,
        message: 'User not found',
      });
    }

    if (user_data.is_admin) {
      if (Number(target_user_id) === Number(req.user.id)) {
        return res.status(200).json({
          status_code: 403,
          message: "Admin can't delete their own account.",
        });
      }

      // For deleting another admin, ensure at least one admin remains.
      const admin_count = await User.count({
        where: { is_admin: true },
      });

      if (admin_count <= 1) {
        return res.status(200).json({
          status_code: 403,
          message: 'At least one admin must remain. Cannot delete the only admin account.',
        });
      }
    }

    // Soft delete by setting is_active to false
    await user_data.update({ is_active: false });

    return res.status(200).json({
      status_code: 200,
      message: `${user_data.username} has been soft deleted (set as inactive)`,
      data: user_data,
    });
  } catch (error) {
    console.error('Error performing soft delete for user: ', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

export const restore_deleted_user = async (req, res) => {
  try {
    const target_user_id = req.query.userId ? req.query.userId : req.user.id;
    const where_condition = req.query.userId ? { id: target_user_id } : { id: target_user_id, email: req.user.email };

    const user_data = await User.findOne({
      where: where_condition,
      attributes: { exclude: ['password'] },
    });

    if (!user_data) {
      return res.status(200).json({
        status_code: 404,
        message: 'User not found',
      });
    }

    // Restore by setting is_active to true
    await user_data.update({ is_active: true });

    return res.status(200).json({
      status_code: 200,
      message: `${user_data.username} has been restored`,
      data: user_data,
    });
  } catch (error) {
    console.error('Error restoring user: ', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

export const get_all_user = async (req, res) => {
  try {
    const all_users = await User.findAll({
      order: [['createdAt', 'DESC']],
      attributes: { exclude: ['password'] },
    });
    if (!all_users.length) {
      return res.status(200).json({
        status_code: 404,
        message: 'No users found',
        data: [],
      });
    }
    return res.status(200).json({
      status_code: 200,
      message: 'Users retrieved successfully',
      data: all_users,
    });
  } catch (error) {
    console.error('Error getting all users ', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
};
