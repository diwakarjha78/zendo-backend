import express from 'express';
import { dashboard_page } from '../controllers/dashboard.controller.js';
import {
  forgot_password,
  forgot_password_post,
  login_page,
  login_post,
  reset_password,
  reset_password_post,
  verify_otp,
  verify_otp_post,
} from '../controllers/login.controller.js';

const admin_router = express.Router();

// Dashboard route
admin_router.get('/', dashboard_page);

// Login routes
admin_router.get('/auth/login', login_page);
admin_router.post('/auth/login', login_post);

// Forgot password route
admin_router.get('/auth/forgot-password', forgot_password);
admin_router.post('/auth/forgot-password', forgot_password_post);

// Verify OTP route
admin_router.get('/auth/verify-otp', verify_otp);
admin_router.post('/auth/verify-otp', verify_otp_post);

// Reset password route
admin_router.get('/auth/reset-password', reset_password);
admin_router.post('/auth/reset-password', reset_password_post);

export default admin_router;
