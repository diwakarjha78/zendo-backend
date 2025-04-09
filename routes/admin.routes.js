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
import { redirect_if_authenticated, is_authenticated } from '../middlewares/auth.middleware.js';

const admin_router = express.Router();

// Dashboard route
admin_router.get('/', is_authenticated, dashboard_page);

// Login routes
admin_router.get('/auth/login', redirect_if_authenticated, login_page);
admin_router.post('/auth/login', redirect_if_authenticated, login_post);

// Forgot password route
admin_router.get('/auth/forgot-password', redirect_if_authenticated, forgot_password);
admin_router.post('/auth/forgot-password', redirect_if_authenticated, forgot_password_post);

// Verify OTP route
admin_router.get('/auth/verify-otp', redirect_if_authenticated, verify_otp);
admin_router.post('/auth/verify-otp', redirect_if_authenticated, verify_otp_post);

// Reset password route
admin_router.get('/auth/reset-password', redirect_if_authenticated, reset_password);
admin_router.post('/auth/reset-password', redirect_if_authenticated, reset_password_post);

export default admin_router;
