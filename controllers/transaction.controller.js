import Transaction from '../models/transaction.model.js';
import Admin_notification from '../models/admin_notification.model.js';
import User from '../models/user.model.js';

export const create_transaction = async (req, res) => {
  try {
    const { user_id, price, transaction_id } = req.body;
    const order_id = Math.floor(Math.random() * 1000000).toString();
    const transaction = await Transaction.create({
      user_id,
      price,
      transaction_id,
      order_id,
    });
    const user = await User.findOne({
      where: { id: user_id },
    });
    const username = user.username;
    const notification = await Admin_notification.create({
      title: 'Transaction Created',
      message: `${username} made transaction of $${price}`,
    });
    return res.status(200).json({
      status_code: 200,
      message: 'Transaction created successfully',
      data: transaction,
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

export const get_all_transactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['username', 'email'],
        },
      ],
    });
    if (!transactions) {
      return res.status(200).json({
        status_code: 404,
        message: 'No transactions found',
      });
    }
    return res.status(200).json({
      status_code: 200,
      message: 'Transactions fetched successfully',
      data: transactions,
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
};
