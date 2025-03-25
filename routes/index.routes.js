import express from 'express';
import { Image_upload } from '../middlewares/upload.middleware.js';
import { get_about_us } from '../controllers/about_us.controller.js';
import { main_budget_estimation, get_budget_estimation } from '../controllers/budget_estimation.controller.js';
import { get_contact_details, contact_us_details } from '../controllers/contact.controller.js';
import { verify_token } from '../middlewares/token.middleware.js';
import { set_device_count, get_device_count } from '../controllers/device_count.controller.js';
import { get_help_support_data } from '../controllers/help_support.controller.js';
import { login, logout, refresh_token } from '../controllers/login.controller.js';
import { get_notifications, delete_notifications } from '../controllers/notification.controller.js';
import {
  generate_forgot_password_otp,
  create_password,
  verify_forgot_password_otp,
} from '../controllers/password.controller.js';
import { add_payment } from '../controllers/payment.controller.js';
import { get_privacy_policy } from '../controllers/privacy_policy.controller.js';
import { create_user, generate_otp, verify_email } from '../controllers/signup.controller.js';
import { get_terms_policies } from '../controllers/terms_policies.controller.js';
import { get_profile, update_user, soft_delete_user } from '../controllers/user.controller.js';
import { get_home, create_latest_rendering, create_select_your_budget, create_select_your_room, create_select_your_style, create_select_your_furniture } from '../controllers/home.controller.js';
import { upload_rendering_image, get_rendering_image, delete_rendering_image } from '../controllers/rendering_image.controller.js';
import { upload_swipe_preference_image, get_swipe_preference_images } from '../controllers/swipe_preference_image.controller.js';
import {
  get_subscription_list,
  get_subscription_by_id,
  post_subscription,
  update_subscription,
  delete_subscription,
} from '../controllers/subscription.controller.js';

const router = express.Router();

router.get('/aboutUs', get_about_us);
router.post('/budgetEstimation', main_budget_estimation);
router.get('/getBudgetEstimation', get_budget_estimation);
router.get('/getContactDetails', get_contact_details);
router.post('/userContactDetails', verify_token, contact_us_details);
router.post('/setDeviceCount', set_device_count);
router.get('/getCount/:id', get_device_count);
router.get('/getHelpSupport', get_help_support_data);
router.post('/login', login);
router.get('/logout', verify_token, logout);
router.post('/refreshToken', refresh_token);
router.get('/notification', verify_token, get_notifications);
router.post('/deleteNotification', verify_token, delete_notifications);
router.post('/forgetPasswordOtpGenerate', generate_forgot_password_otp);
router.post('/forgetPasswordOtpVerify', verify_forgot_password_otp);
router.post('/createPassword', create_password);
router.post('/addPayment', verify_token, add_payment);
router.get('/getPrivacyPolicy', get_privacy_policy);
router.post('/signup', create_user);
router.post('/signupOtpGenerate', generate_otp);
router.post('/signupOtpVerify', verify_email);
router.get('/termsPolicies', get_terms_policies);
router.get('/userGetProfileData', verify_token, get_profile);
router.post('/userUpdateProfile', verify_token, Image_upload, update_user);
router.get('/home', verify_token, get_home);
router.post('/uploadRenderingImage', verify_token, upload_rendering_image);
router.get('/getRenderingImage', verify_token, get_rendering_image);
router.post('/deleteRenderingImage', verify_token, delete_rendering_image);
router.post('/uploadSwipePreferenceImage', Image_upload, upload_swipe_preference_image);
router.get('/getSwipePreferenceImage', get_swipe_preference_images);
router.get('/deleteUser', verify_token, soft_delete_user);
router.post('/uploadLatestRendering', Image_upload, create_latest_rendering);
router.post('/uploadSelectYourBudget', Image_upload, create_select_your_budget);
router.post('/uploadSelectYourRoom', Image_upload, create_select_your_room);
router.post('/uploadSelectYourStyle', Image_upload, create_select_your_style);
router.post('/uploadSelectYourFurniture', Image_upload, create_select_your_furniture);
router.get('/subscriptionList', get_subscription_list);
router.get('/subscriptionList/:id', get_subscription_by_id);
router.post('/subscription', Image_upload, post_subscription);
router.put('/subscription/:id', Image_upload, update_subscription);
router.delete('/subscription/:id', delete_subscription);

export default router;
