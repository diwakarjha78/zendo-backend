import User from '../models/user.model.js';
import User_swipe_preference from '../models/user_swipe_preference.model.js';
import Swipe_preference_image from '../models/swipe_preference_image.model.js';

// Create a new user swipe preference
export const create_user_swipe_preference = async (req, res) => {
  try {
    const { user_id, image_id, liked } = req.body;
    if (user_id == null || image_id == null || liked == null) {
      return res.status(200).json({
        status_code: 404,
        message: 'Missing required fields: user_id, image_id, and liked are required.',
      });
    }

    const new_preference = await User_swipe_preference.create({ user_id, image_id, liked });
    return res.status(200).json({
      status_code: 200,
      message: 'User swipe preference created successfully',
      data: new_preference,
    });
  } catch (error) {
    console.error('Error creating user swipe preference:', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Internal Server Error',
      error: error.messaage,
    });
  }
};

// Retrieve all user swipe preferences
export const get_all_user_swipe_preferences = async (req, res) => {
  try {
    const preferences = await User_swipe_preference.findAll();
    return res.status(200).json({
      status_code: 200,
      message: 'User swipe preferences retrieved successfully',
      data: preferences,
    });
  } catch (error) {
    console.error('Error retrieving user swipe preferences:', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Error retrieving user swipe preferences',
      error: error.message,
    });
  }
};

// Retrieve a single user swipe preference by its ID
export const get_user_swipe_preference_by_id = async (req, res) => {
  try {
    const { id } = req.params;
    const preference = await User_swipe_preference.findByPk(id);
    if (!preference) {
      return res.status(200).json({
        status_code: 404,
        message: 'User swipe preference not found',
      });
    }
    return res.status(200).json({
      status_code: 200,
      message: 'User swipe preference retrieved successfully',
      data: preference,
    });
  } catch (error) {
    console.error('Error retrieving user swipe preference:', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Error retrieving user swipe preference',
      error: error.message,
    });
  }
};

// Update a user swipe preference (for example, updating the liked field)
export const update_user_swipe_preference = async (req, res) => {
  try {
    const { id } = req.params;
    const { liked } = req.body;

    const preference = await User_swipe_preference.findByPk(id);
    if (!preference) {
      return res.status(200).json({
        status_code: 404,
        message: 'User swipe preference not found',
      });
    }

    // Update fields (in this case, we only update the liked field)
    preference.liked = liked;
    await preference.save();

    return res.status(200).json({
      status_code: 200,
      message: 'User swipe preference updated successfully',
      data: preference,
    });
  } catch (error) {
    console.error('Error updating user swipe preference:', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Error updating user swipe preference',
      error: error.message,
    });
  }
};

// Delete a user swipe preference by its ID
export const delete_user_swipe_preference = async (req, res) => {
  try {
    const { id } = req.params;

    const preference = await User_swipe_preference.findByPk(id);
    if (!preference) {
      return res.status(200).json({
        status_code: 404,
        message: 'User swipe preference not found',
      });
    }

    await preference.destroy();
    return res.status(200).json({
      status_code: 200,
      message: 'User swipe preference deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting user swipe preference:', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Error deleting user swipe preference',
      error: error.message,
    });
  }
};

// Retrieve all users with their swipe preferences
export const get_all_users_with_preferences = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: User_swipe_preference,
          attributes: ['image_id', 'liked'],
          include: [
            {
              model: Swipe_preference_image,
              attributes: ['image_url'],
            },
          ],
        },
      ],
    });

    // Transform the data to match the desired structure.
    const transformed_users = users.map((user) => {
      // Depending on your aliasing, the associated swipe preferences may appear as:
      // user.User_swipe_preferences or a custom alias if you defined one.
      const preferences = (user.User_swipe_preferences || []).map((pref) => ({
        image_id: pref.image_id,
        liked: pref.liked,
        image_url: pref.Swipe_preference_image?.image_url || null,
      }));

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        is_active: user.is_active,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        preferences,
      };
    });

    return res.status(200).json({
      status_code: 200,
      message: 'Users with swipe preferences retrieved successfully',
      data: transformed_users,
    });
  } catch (error) {
    console.error('Error retrieving user with swipe preferences:', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Error retrieving user with swipe preferences',
      error: error.message,
    });
  }
};
