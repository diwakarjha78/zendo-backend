import Notification from '../models/notification.model.js';

export const get_notifications = async (req, res) => {
  try {
    // const user_id = req.user.id;

    // Fetch notifications only for the logged-in user, sorted by date (latest first)
    // const notifications = await Notification.findAll({
    //   where: { user_id },
    //   order: [['notification_date', 'DESC']],
    // });

    const notifications = await Notification.findAll({
      where: { userId: req.user.id }, // Adjust field name as per your model
      order: [['notification_date', 'DESC']],
    });

    if (!notifications.length) {
      return res.status(200).json({
        status_code: 404,
        message: 'No notifications found',
        data: [],
      });
    }

    // Group notifications by date
    const grouped_notifications = notifications.reduce((acc, notif) => {
      const date_key = new Date(notif.notification_date).toISOString().split('T')[0];
      // Extract date only

      if (!acc[date_key]) {
        acc[date_key] = {
          date: date_key,
          list_name: 'User Notifications',
          notifications: [],
        };
      }

      acc[date_key].notifications.push({
        id: notif.id,
        message: notif.message,
        title: notif.title,
        notification_image_url: notif.notification_image_url,
      });

      return acc;
    }, {});

    // Convert grouped object into an array
    const response_array = Object.values(grouped_notifications);

    return res.status(200).json({
      status_code: 200,
      message: 'Notifications retrieved successfully',
      data: response_array,
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export const delete_notifications = async (req, res) => {
  try {
    const notification_id = req.body;

    if (!Array.isArray(notification_id) || notification_id.length === 0) {
      return res.status(200).json({
        status_code: 400,
        message: 'Invalid request. Please provide at least one notification ID.',
      });
    }

    const deleted_count = await Notification.destroy({
      where: { id: notification_id },
    });

    if (!deleted_count)
      return res.status(200).json({
        status_code: 404,
        message: 'No notification were found for the provided IDs',
      });
    return res.status(200).json({
      status_code: 200,
      message: 'Notification deleted succesfully',
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'Error while deleting the notification',
      error: error.message,
    });
  }
};
