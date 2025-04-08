import Payment from '../../../models/payment.model.js';

export const add_payment = async (req, res) => {
  try {
    const user = req.user;
    const { txn_id, amount, payment_method, order_id } = req.body;

    if (!txn_id || !amount || !payment_method || !order_id) {
      return res.status(200).json({
        status_code: 422,
        message: 'Please fill all the fields',
      });
    }
    const new_payment = await Payment.create({
      user_id: user.id,
      txn_id,
      amount,
      payment_method,
      order_id,
    });
    return res.status(200).json({
      status_code: 200,
      message: 'Payment added successfully',
      data: new_payment,
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'Error in adding the payment',
      error: error.message,
    });
  }
};
