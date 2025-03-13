import User from '../models/user.model.js';
import { hashed_password } from '../helpers/auth.helper.js';
import Verification_otp from '../models/verification_otp.model.js';
import { Mailer } from '../configs/mailer.config.js';

export const create_password = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(200).json({
        status_code: 400,
        message: 'Email and password are required',
      });
    }

    // Find user
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(200).json({
        status_code: 404,
        message: 'User not found',
      });
    }

    // Hash password and update user
    const encrypted_password = await hashed_password(password);
    user.password = encrypted_password;
    await User.update({ password: encrypted_password }, { where: { email } });

    return res.status(200).json({
      status_code: 200,
      message: 'Password created successfully',
    });
  } catch (error) {
    console.error('Error in creating password:', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

export const generate_forgot_password_otp = async (req, res) => {
  const email = req.body.email;

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(200).json({
      status_code: 400,
      message: 'Invalid email address',
    });
  }

  try {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(200).json({
        status_code: 422,
        message: 'Email is not found',
        error: `${email}`,
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const expires_at = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    await Verification_otp.upsert({
      email,
      otp: otp.toString(),
      expires_at: expires_at,
    });

    const mailer_subject = 'One time password';
    const mailer_text = `Your OTP is ${otp}, Please verify your email it will expire in 10 minutes`;

    const email_sent = await Mailer(email, mailer_subject, mailer_text);
    if (!email_sent) {
      console.error(`Failed to send OTP to ${email}`);
      return res.status(200).json({
        status_code: 500,
        message: 'Failed to send OTP. Please try again later.',
      });
    }

    return res.status(200).json({
      status_code: 200,
      message: 'OTP has been sent to your email',
      data: {
        email: email,
        otp: otp,
      },
    });
  } catch (error) {
    console.error('Error generating OTP:', error);
    return res.status(200).json({
      status_code: 500,
      message: 'Error generating OTP',
    });
  }
};

export const verify_forgot_password_otp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Validate input
    if (!email || !otp) {
      return res.status(200).json({
        status_code: 422,
        message: !email && !otp ? 'Please enter email and otp' : !email ? 'Please enter email' : 'Please enter otp',
      });
    }

    // Convert OTP to string for comparison
    const otp_string = otp.toString();

    // Find the OTP record
    const verify = await Verification_otp.findOne({
      where: {
        email: email,
        otp: otp_string,
      },
    });

    // Check if OTP exists and is valid
    if (!verify) {
      return res.status(200).json({
        status_code: 422,
        message: 'Invalid OTP',
        error: `${email}`,
      });
    }

    // Check if OTP has expired
    if (verify.expires_at < new Date()) {
      await Verification_otp.destroy({
        where: { id: verify.id },
      });

      return res.status(200).json({
        status_code: 422,
        message: 'OTP has expired',
        error: `${email}`,
      });
    }

    // Delete the used OTP
    await Verification_otp.destroy({
      where: { id: verify.id },
    });

    const user = await User.findOne({
      where: { email },
    });

    return res.status(200).json({
      status_code: 200,
      message: 'OTP verified successfully',
      data: {
        email: email,
        token: user.token,
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
