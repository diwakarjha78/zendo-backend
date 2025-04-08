import User from '../../../models/user.model.js';
import Budget_estimation from '../../../models/budget_estimation.model.js';
import User_budget_estimation from '../../../models/user_budget_estimation.model.js';

export const create_user_budget_estimation = async (req, res) => {
  try {
    const { user_id, image_id, status } = req.body;
    if (!user_id || !image_id || !status) {
      return res.status(200).json({
        status_code: 400,
        message: 'User ID, Image ID, and Status are required',
      });
    }
    // Check if the user has already swiped on this image
    const existing_budget_estimation = await User_budget_estimation.findOne({
      where: { user_id, image_id },
    });
    if (existing_budget_estimation) {
      return res.status(200).json({
        status_code: 409,
        message: 'User has already give the budget estimation.',
      });
    }
    const new_user_budget_estimation = await User_budget_estimation.create({
      user_id,
      image_id,
      status,
    });
    return res.status(200).json({
      status_code: 200,
      message: 'User Budget Estimation created successfully',
      data: new_user_budget_estimation,
    });
  } catch (error) {
    console.error('Error creating user budget estimation', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

export const get_user_budget_estimations = async (req, res) => {
  try {
    const user_budget_estimations = await User_budget_estimation.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'email', 'mobile', 'is_active', 'createdAt', 'updatedAt', 'image_url'],
        },
        {
          model: Budget_estimation,
          attributes: ['image_url'],
        },
      ],
    });

    if (!user_budget_estimations || user_budget_estimations.length === 0) {
      return res.status(200).json({
        status_code: 404,
        message: 'No user budget estimations found',
        data: [],
      });
    }

    const formatted_data = user_budget_estimations.map((item) => ({
      id: item.id,
      user_id: item.user_id,
      image_id: item.image_id,
      status: item.status,
      image_url: item.Budget_estimation.image_url,
      username: item.User.username,
      email: item.User.email,
    }));

    return res.status(200).json({
      status_code: 200,
      message: 'User budget estimations retrieved successfully',
      data: formatted_data,
    });
  } catch (error) {
    console.error('Error fetching user budget estimations:', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

export const get_all_user_budget_estimations = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: User_budget_estimation,
          attributes: ['image_id', 'status'],
          include: [
            {
              model: Budget_estimation,
              attributes: ['image_url'],
            },
          ],
        },
      ],
    });

    // Transform the data to match the desired structure.
    const transformed_users = users.map((user) => {
      const estimations =
        user.User_budget_estimations?.map((pref) => ({
          image_id: pref.image_id,
          status: pref.status,
          image_url: pref.Budget_estimation?.image_url || null,
        })) || [];

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        is_active: user.is_active,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        estimations,
      };
    });

    return res.status(200).json({
      status_code: 200,
      message: 'All users budget estimations retrieved successfully',
      data: transformed_users,
    });
  } catch (error) {
    console.error('Error retrieving all user budget estimations:', error);
    return res.status(500).json({
      status_code: 500,
      message: 'Error retrieving all user budget estimations',
      error: error.message,
    });
  }
};
