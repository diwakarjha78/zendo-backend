import { Mailer } from '../configs/mailer.config.js';
import { hashed_password, generate_token, generate_refresh_token } from '../helpers/auth.helper.js';
import Verification_otp from '../models/verification_otp.model.js';
import User from '../models/user.model.js';

export const create_user = async (req, res) => {
  try {
    const { username, email, mobile, password, fcm_token } = req.body;

    if (!password) {
      return res.status(200).json({
        status_code: 422,
        message: 'Password is required',
      });
    }

    const existing_user = await User.findOne({ where: { email } });
    if (existing_user) {
      return res.status(200).json({
        status_code: 409,
        message: 'User with this email already exists',
      });
    }

    const encrypted_password = await hashed_password(password);
    const new_user = await User.create({
      username,
      email,
      mobile: mobile ? mobile : '',
      password: encrypted_password,
      fcm_token: fcm_token ? fcm_token : '',
    });

    const token = generate_token(new_user);
    const refresh_token = generate_refresh_token(new_user);

    await new_user.update({ token, refresh_token: refresh_token });

    const updated_user = await User.findOne({
      where: { id: new_user.id },
      attributes: { exclude: ['password'] },
    });

    res.status(200).json({
      status_code: 200,
      message: 'User has been created successfully',
      data: updated_user,
    });
  } catch (error) {
    console.log('Error while creating User', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Error while creating the User',
      error: error.message,
    });
  }
};

export const generate_otp = async (req, res) => {
  const email = req.body.email;

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(200).json({
      status_code: 400,
      message: 'Invalid email address',
    });
  }

  try {
    // Check if email exists
    const email_exists = await User.findOne({
      where: { email },
    });
    if (email_exists) {
      return res.status(200).json({
        status_code: 422,
        message: 'Email already exist please try to login',
        error: {
          email: email,
        },
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const expires_at = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Update or create OTP record
    await Verification_otp.upsert({
      email,
      otp,
      expires_at: expires_at,
    });

    const mailer_subject = 'One time password';
    const mailer_text = `Your OTP is ${otp}, Please verify your email it will expire in 10 minutes`;

    const email_sent = await Mailer(email, mailer_subject, mailer_text);

    if (!email_sent) {
      return res.status(200).json({
        status_code: 500,
        message: 'Failed to send OTP. Please try again later.',
      });
    }
    return res.status(200).json({
      status_code: 200,
      message: 'Otp has been sent to your email',
      data: {
        email: email,
        otp: otp,
      },
    });
  } catch (error) {
    console.error('Error generating OTP:', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Error generating OTP. Please try again later.',
      error: error.message,
    });
  }
};

export const verify_email = async (req, res) => {
  const { email, otp } = req.body;
  try {
    if (!email || !otp) {
      return res.status(200).json({
        status_code: 422,
        message: {
          error: !email && !otp ? 'Please enter email and otp' : !email ? 'Please enter email' : 'Please enter otp',
        },
      });
    }

    const otp_string = otp.toString();
    const verify = await Verification_otp.findOne({
      where: {
        email: email,
        otp: otp_string,
      },
    });

    if (!verify) {
      return res.status(200).json({
        status_code: 422,
        message: 'Invalid OTP',
        error: {
          email: email,
        },
      });
    }

    if (verify.expires_at < new Date()) {
      await Verification_otp.destroy({
        where: {
          id: verify.id,
        },
      });
      return res.status(200).json({
        status_code: 422,
        message: 'OTP has expired',
        error: {
          email: email,
        },
      });
    }

    // Delete the used OTP
    await Verification_otp.destroy({
      where: {
        id: verify.id, // Note: using id instead of _id
      },
    });

    return res.status(200).json({
      status_code: 200,
      message: 'OTP verified successfully',
      data: {
        email: email,
      },
    });
  } catch (error) {
    console.error('Internal Server Error:', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
};
