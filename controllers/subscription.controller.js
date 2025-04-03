import { BASE_URL } from '../configs/dotenv.config.js';
import Subscription from '../models/subscription.model.js';
import Subscription_data from '../models/subscription_data.model.js';

// Define relationships

/**
 * GET the first subscription (instead of a list)
 */
export const get_subscription_list = async (req, res) => {
  try {
    // Find all, include child data
    const subscriptions = await Subscription.findAll({
      include: [{ model: Subscription_data, as: 'data' }],
    });

    // If none found, return 404-like response
    if (!subscriptions || subscriptions.length === 0) {
      return res.status(200).json({
        status_code: 404,
        message: 'No subscription found',
      });
    }

    // Return only the first subscription
    const subscription = subscriptions[0];

    return res.status(200).json({
      status_code: 200,
      message: 'Data fetched successfully',
      data: subscription, // single object
    });
  } catch (error) {
    console.error('Error while fetching subscription list', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Error while fetching subscription',
      error: error.message,
    });
  }
};

/**
 * GET a single subscription by ID
 */
export const get_subscription_by_id = async (req, res) => {
  try {
    const subscription = await Subscription.findByPk(req.params.id, {
      include: [{ model: Subscription_data, as: 'data' }],
    });

    if (!subscription) {
      return res.status(200).json({
        status_code: 404,
        message: 'No subscription found',
      });
    }

    return res.status(200).json({
      status_code: 200,
      message: 'Data fetched successfully',
      data: subscription, // single object
    });
  } catch (error) {
    console.error('Error while fetching subscription by id', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Error while fetching subscription by id',
      error: error.message,
    });
  }
};

/**
 * CREATE a new subscription
 */
export const post_subscription = async (req, res) => {
  try {
    const { text, trial_day, data } = req.body;
    const file = req.file;

    // Basic validation
    if (!text || trial_day === undefined) {
      return res.status(200).json({
        status_code: 400,
        message: 'Text and trial_day are required',
      });
    }

    let image = '';
    if (file) {
      image = `${BASE_URL}/api/images/${file.filename}`;
    }

    // Create subscription
    const subscription = await Subscription.create({
      image,
      text,
      trial_day,
    });

    // Create child data if provided
    if (data && Array.isArray(data)) {
      const items = data.map((item) => ({
        ...item,
        subscription_id: subscription.id,
      }));
      await Subscription_data.bulkCreate(items);
    }

    // Fetch newly created subscription (with child data)
    const new_subscription = await Subscription.findByPk(subscription.id, {
      include: [{ model: Subscription_data, as: 'data' }],
    });

    return res.status(200).json({
      status_code: 200,
      message: 'Subscription created successfully',
      data: new_subscription, // single object
    });
  } catch (error) {
    console.error('Error while creating subscription:', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Error while creating subscription',
      error: error.message,
    });
  }
};

/**
 * UPDATE a subscription by ID (partial updates)
 */
export const update_subscription = async (req, res) => {
  try {
    const { id } = req.params;

    // Find existing subscription
    const subscription = await Subscription.findByPk(id, {
      include: [{ model: Subscription_data, as: 'data' }],
    });

    if (!subscription) {
      return res.status(200).json({
        status_code: 404,
        message: 'Subscription not found',
      });
    }

    const { text, trial_day, data } = req.body;
    const file = req.file;

    // Update only provided fields
    if (typeof text !== 'undefined') {
      subscription.text = text.trim();
    }
    if (typeof trial_day !== 'undefined') {
      subscription.trial_day = trial_day;
    }
    if (file) {
      subscription.image = `${BASE_URL}/api/images/${file.filename}`;
    }

    // Save subscription changes
    await subscription.save();

    // If new data array is provided, remove old data & create new
    if (data && Array.isArray(data)) {
      await Subscription_data.destroy({ where: { subscription_id: id } });
      const items = data.map((item) => ({
        ...item,
        subscription_id: id,
      }));
      await Subscription_data.bulkCreate(items);
    }

    // Fetch the updated subscription
    const updatedSubscription = await Subscription.findByPk(id, {
      include: [{ model: Subscription_data, as: 'data' }],
    });

    return res.status(200).json({
      status_code: 200,
      message: 'Subscription updated successfully',
      data: updatedSubscription, // single object
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

/**
 * DELETE a subscription by ID
 */
export const delete_subscription = async (req, res) => {
  try {
    const { id } = req.params;

    const subscription = await Subscription.findByPk(id);
    if (!subscription) {
      return res.status(200).json({
        status_code: 404,
        message: 'Subscription not found',
      });
    }

    await subscription.destroy();
    return res.status(200).json({
      status_code: 200,
      message: 'Subscription deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting subscription:', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
};
