import User from './models/user.model.js';
import Contact_us from './models/contact_us.model.js';
import User_swipe_preference from './models/user_swipe_preference.model.js';
import Swipe_preference_image from './models/swipe_preference_image.model.js';
import Subscription from './models/subscription.model.js';
import Subscription_data from './models/subscription_data.model.js';
import Notification from './models/notification.model.js';
import Payment from './models/payment.model.js';

const define_association = () => {
    // Contact_us
    User.hasMany(Contact_us, { foreignKey: 'userId' });
    Contact_us.belongsTo(User, { foreignKey: 'userId' });

    // User Swipe Preference
    User.hasMany(User_swipe_preference, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    User_swipe_preference.belongsTo(User, { foreignKey: 'user_id' });
    Swipe_preference_image.hasMany(User_swipe_preference, { foreignKey: 'image_id', onDelete: 'CASCADE' });
    User_swipe_preference.belongsTo(Swipe_preference_image, { foreignKey: 'image_id' });

    // Subscription
    Subscription.hasMany(Subscription_data, { as: 'data', foreignKey: 'subscription_id' });
    Subscription_data.belongsTo(Subscription, { foreignKey: 'subscription_id', as: 'subscription' });

    // Notification
    User.hasMany(Notification, { foreignKey: 'userId' });
    Notification.belongsTo(User, { foreignKey: 'userId' });

    // Payment
    User.hasMany(Payment, { foreignKey: 'user_id' });
    Payment.belongsTo(User, { foreignKey: 'user_id' });
}

export default define_association;