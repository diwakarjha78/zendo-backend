import { BASE_URL } from '../configs/dotenv.config.js';
import Subscription from '../models/subscription.model.js';
import Subscription_data from '../models/subscription_data.model.js';

Subscription.hasMany(Subscription_data, { as: 'data', foreignKey: 'subscription_id' });
Subscription_data.belongsTo(Subscription, { foreignKey: 'subscription_id', as: 'subscription' });

export const get_subscription_list = async (req, res) => {
  try {
    const subscriptions = await Subscription.findAll({
      include: [{ model: Subscription_data, as: 'data' }],
    });
    if (!subscriptions || subscriptions.length === 0) {
      return res.status(200).json({
        status_code: 404,
        message: 'No subscription list found',
      });
    }
    return res.status(200).json({
      status_code: 200,
      message: 'Data fetched successfully',
      data: subscriptions,
    });
  } catch (error) {
    console.log('Error while fetching subscription list', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Error while fetching subscription list',
      error: error.message,
    });
  }
};

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
      data: subscription,
    });
  } catch (error) {
    console.log('Error while fetching subscription by id', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Error while fetching subscription by id',
      error: error.message,
    });
  }
};

export const post_subscription = async (req, res) => {
  try {
    const { text, trial_day, data } = req.body;
    const file = req.file;
    let image = '';
    if (file) {
      image = `${BASE_URL}/api/images/${file.filename}`;
    }
    if (!text && !trial_day) {
      return res.status(200).json({
        status_code: 400,
        message: 'Text and Trial day is required',
      });
    }
    if (!text) {
      return res.status(200).json({
        status_code: 400,
        message: 'Text is required',
      });
    }
    if (!text) {
      return res.status(200).json({
        status_code: 400,
        message: 'Text is required',
      });
    }
    const subscription = await Subscription.create({ image, text, trial_day });
    if (data && Array.isArray(data)) {
      const items = data.map((item) => ({ ...item, subscription_id: subscription.id }));
      await Subscription_data.bulkCreate(items);
    }
    const new_subscription = await Subscription.findByPk(subscription.id, {
      include: [{ model: Subscription_data, as: 'data' }],
    });
    return res.status(200).json({
      status_code: 200,
      message: 'Subscription created successfully',
      data: new_subscription,
    });
  } catch (error) {
    console.log('Error while fetching subscription by id', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Error while fetching subscription by id',
      error: error.message,
    });
  }
};

export const update_subscription = async (req, res) => {
  try {
    const { id } = req.params;
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

    const update_fields = {};
    if (text !== undefined) {
      update_fields.text = text === '' ? subscription.text.trim() : text.trim();
    }
    if (trial_day !== undefined) {
      update_fields.trial_day = trial_day;
    }
    if (file) {
      update_fields.image = `${BASE_URL}/api/images/${file.filename}`;
    }
    if (Object.keys(update_fields).length === 0 && !data) {
      return res.status(200).json({
        status_code: 400,
        message: 'No fields provided for update',
      });
    }

    await Subscription.update(update_fields, {
      where: { id },
    });

    // If new data is provided, remove existing items and add new ones
    if (data && Array.isArray(data)) {
      await Subscription_data.destroy({ where: { subscription_id: id } });
      const items = data.map((item) => ({ ...item, subscription_id: id }));
      await Subscription_data.bulkCreate(items);
    }

    // Get updated subscription
    const updatedSubscription = await Subscription.findByPk(id, {
      include: [{ model: Subscription_data, as: 'data' }],
    });

    return res.status(200).json({
      status_code: 200,
      message: 'Subscription updated successfully',
      data: updatedSubscription,
    });
  } catch (error) {
    console.error('Error updating subscription: ', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

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
    console.error('Error deleting subscription: ', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
};
