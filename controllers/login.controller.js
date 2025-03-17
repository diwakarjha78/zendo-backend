import jwt from "jsonwebtoken";
import User from '../models/user.model.js';
import { JWT_REFRESH_TOKEN_SECRET_KEY } from '../configs/dotenv.config.js';
import { compare_password, generate_token, generate_refresh_token } from '../helpers/auth.helper.js';

export const login = async (req, res) => {
  const { email, password, fcm_token } = req.body;

  try {
    if (!email || !password) {
      return res.status(200).json({
        status_code: 400,
        message: 'Email and password are required',
      });
    }

    // Find user by email
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(200).json({
        status_code: 422,
        message: 'Email is not registered',
        error: {
          email: email,
        },
      });
    }
    const is_match = await compare_password(password, user.password);

    if (!is_match) {
      return res.status(200).json({
        status_code: 422,
        message: 'Incorrect Password',
        error: {
          email: email,
        },
      });
    }

    // Generate JWT token
    const token = generate_token(user);

    // Generate refresh token
    const refresh_token = generate_refresh_token(user);

    // Store the refresh token in the database
    await User.update(
      {
        token: token,
        fcm_token: fcm_token?.trim() || '',
        refresh_token: refresh_token, // Store refresh token
      },
      {
        where: { id: user.id },
      }
    );

    // First, get the updated user data
    const updated_user = await User.findOne({
      where: { id: user.id },
      attributes: { exclude: ['password'] },
    });

    return res.status(200).json({
      status_code: 200,
      message: 'Login Successful',
      data: updated_user,
    });
  } catch (error) {
    console.error('Error while fetching User', error);
    return res.status(200).json({
      status_code: 422,
      message: 'Error while login',
      error: error.message,
    });
  }
};

export const refresh_token = async (req, res) => {
  try {
    const auth_header = req.headers.authorization;
    if (!auth_header || !auth_header.startsWith('Bearer') || !auth_header.split(' ')[1]) {
      return res.status(200).json({
        status_code: 401,
        message: 'No refresh token was provided. Please authenticate',
      });
    }

    const refresh_token_from_header = auth_header.split(' ')[1];
    const decoded = jwt.verify(refresh_token_from_header, JWT_REFRESH_TOKEN_SECRET_KEY);

    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) {
      return res.status(200).json({
        status_code: 401,
        message: 'No user found with the provided refresh token',
      });
    }

    // Check if the refresh token matches the one stored in the database
    if (refresh_token_from_header !== user.refresh_token) {
      return res.status(200).json({
        status_code: 401,
        message: 'Invalid refresh token',
      });
    }

    const new_token = generate_token(decoded);
    await User.update({ token: new_token }, { where: { id: decoded.id } });

    return res.status(200).json({
      status_code: 200,
      message: 'New token is generated and saved',
      token: new_token,
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 401,
      message: 'Error in refreshing the token',
      error: error.message,
    });
  }
};
