import Admin_notification from '../models/admin_notification.model.js';

export const get_all_admin_notifications = async (req, res) => {
  try {
    const notifications = await Admin_notification.findAll({
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      status_code: 200,
      message: 'Admin notifications fetched successfully',
      data: notifications,
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

export const get_admin_notification_by_id = async (req, res) => {
  try {
    const { id } = req.body;
    const notification = await Admin_notification.findOne({
      where: { id },
    });

    if (!notification) {
      return res.status(200).json({
        status_code: 404,
        message: 'Notification not found',
      });
    }

    return res.status(200).json({
      status_code: 200,
      message: 'Notification fetched successfully',
      data: notification,
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
};
