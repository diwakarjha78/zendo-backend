import axios from 'axios';
import { API_BASE_URL } from '../configs/dotenv.config.js';

export const login_page = async (req, res) => {
  try {
    res.render('auth/login', { message: null, title: 'Login - Zendo Admin' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const login_post = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });

    if (response.data.status_code === 200) {
      return res.redirect('/');
    } else {
      return res.render('auth/login', {
        message: response.data.message,
        title: 'Login - Zendo Admin',
      });
    }
  } catch (error) {
    console.error(error?.response?.data || error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const forgot_password = async (req, res) => {
  try {
    res.render('auth/forgot_password', { message: null, title: 'Forgot Password - Zendo Admin' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const forgot_password_post = async (req, res) => {
  try {
    const { email } = req.body;
    const response = await axios.post(`${API_BASE_URL}/forgetPasswordOtpGenerate`, { email });
    if (response.data.status_code === 200) {
      return res.redirect(`/auth/verify-otp?email=${encodeURIComponent(email)}`);
    } else {
      return res.render('auth/forgot_password', {
        message: response.data.message,
        title: 'Forgot Password - Zendo Admin',
      });
    }
  } catch (error) {
    console.error(error?.response?.data || error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const verify_otp = async (req, res) => {
  try {
    const email = req.query.email;
    res.render('auth/verify_otp', {
      message: null,
      title: 'Verify OTP - Zendo Admin',
      email: email,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const verify_otp_post = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const response = await axios.post(`${API_BASE_URL}/forgetPasswordOtpVerify`, { email, otp });
    console.log('Response:', response.data);
    if (response.data.status_code === 200) {
      return res.redirect(`/auth/reset-password?email=${encodeURIComponent(email)}`);
    } else {
      return res.render('auth/verify_otp', {
        message: response.data.message,
        title: 'Verify OTP - Zendo Admin',
        email: email,
      });
    }
  } catch (error) {
    console.error(error?.response?.data || error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const reset_password = async (req, res) => {
  try {
    const email = req.query.email;
    const message = req.query.message || null; // read message from the query string
    res.render('auth/reset_password', {
      message: message,
      title: 'Reset Password - Zendo Admin',
      email: email,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const reset_password_post = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.redirect(`/auth/reset-password?email=${encodeURIComponent(email)}&message=Passwords do not match`);
    }
    const response = await axios.post(`${API_BASE_URL}/createPassword`, { email, password });
    if (response.data.status_code === 200) {
      return res.redirect('/auth/login');
    } else {
      return res.redirect(
        `/auth/reset-password?email=${encodeURIComponent(email)}&message=${encodeURIComponent(response.data.message)}`
      );
    }
  } catch (error) {
    const errorMessage = error?.response?.data?.message || 'Internal Server Error';
    return res.redirect(
      `/auth/reset-password?email=${encodeURIComponent(email)}&message=${encodeURIComponent(errorMessage)}`
    );
  }
};
