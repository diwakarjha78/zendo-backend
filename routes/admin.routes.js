import express from 'express';
import { dashboard_page } from '../controllers/dashboard.controller.js';
import { login_page } from '../controllers/login.controller.js';

const admin_router = express.Router();


admin_router.get('/', dashboard_page);
admin_router.get('/auth/login', login_page);



export default admin_router;