import User from '../models/user.model.js';

export const social_login = async (req, res) => {
  const { code, type } = req.body;
  if (!code || !type) {
    return res.status(200).json({
      status_code: 400,
      message: 'Token and type are required',
    });
  }
};
