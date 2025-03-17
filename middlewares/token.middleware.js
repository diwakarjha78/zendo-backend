import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { JWT_SECRET_KEY } from '../configs/dotenv.config.js';

export const verify_token = async (req, res, next) => {
  const auth_header = req.headers.authorization;

  try {
    if (!auth_header || !auth_header.startsWith('Bearer ')) {
      return res.status(200).json({
        status_code: 401,
        message: 'No token provided. Please authenticate',
      });
    }

    const token = auth_header.split(' ')[1];

    // 3. Verify the token and decode user data
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    // 4. Find the user in the database using `decoded.id`
    const user = await User.findOne({
      where: {
        id: decoded.id,
        token: token, // Optional: Also verify token matches stored token
      },
      attributes: {
        exclude: ['password'], // Don't send password
      },
    });

    // 4. Check if user exists
    if (!user) {
      return res.status(200).json({
        status_code: 404,
        message: 'User not found. Invalid token',
      });
    }
    // 5. Attach user details to `req.user` and proceed
    req.user = user;
    next();
  } catch (error) {
    console.error('Error in verifying the token:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(200).json({
        status_code: 401,
        message: 'Token has expired. Please log in again.',
        error: error.message,
      });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(200).json({
        status_code: 401,
        message: 'Invalid token. Please authenticate.',
        error: error.message,
      });
    } else {
      return res.status(200).json({
        status_code: 500,
        message: 'Internal server error.',
        error: error.message,
      });
    }
  }
};
