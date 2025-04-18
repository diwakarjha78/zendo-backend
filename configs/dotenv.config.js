import dotenv from 'dotenv';
dotenv.config();

// Port
export const PORT = process.env.PORT || 5000;

// Node Environment
export const NODE_ENV = process.env.NODE_ENV;

// Base URL
export const BASE_URL = process.env.BASE_URL;
export const API_BASE_URL = process.env.API_BASE_URL;

// Database
export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const DB_NAME = process.env.DB_NAME;
export const DB_PORT = process.env.DB_PORT;

// Authentication
export const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const JWT_REFRESH_TOKEN_SECRET_KEY = process.env.JWT_REFRESH_TOKEN_SECRET_KEY;

// Session Secret
export const SESSION_SECRET = process.env.SESSION_SECRET;

// Nodemailer
export const MAIL_PORT = process.env.MAIL_PORT || 587;
export const MAIL_HOST = process.env.MAIL_HOST;
export const MAIL_USER = process.env.MAIL_USER;
export const MAIL_PASS = process.env.MAIL_PASS;

// Social Login
export const APPLE_CLIENT_ID = process.env.APPLE_CLIENT_ID;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
