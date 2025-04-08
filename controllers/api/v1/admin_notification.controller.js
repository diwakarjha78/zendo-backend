import Admin_notification from '../../../models/admin_notification.model.js';

// Get all notifications (sorted by newest first)
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

// Mark a notification as read (and return the updated notification)
export const mark_notification_as_read = async (req, res) => {
  try {
    const { id } = req.body;

    const notification = await Admin_notification.findOne({ where: { id } });
    if (!notification) {
      return res.status(200).json({ status_code: 404, message: 'Notification not found' });
    }

    if (!notification.is_read) {
      notification.is_read = true;
      await notification.save();
    }

    return res.status(200).json({
      status_code: 200,
      message: 'Notification marked as read',
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

// Delete a notification using route parameter
export const delete_admin_notification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Admin_notification.findOne({ where: { id } });
    if (!notification) {
      return res.status(200).json({
        status_code: 404,
        message: 'Notification not found',
      });
    }

    await notification.destroy();

    return res.status(200).json({
      status_code: 200,
      message: 'Notification deleted successfully',
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
};
