import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { SALT_ROUNDS, JWT_SECRET_KEY, JWT_REFRESH_TOKEN_SECRET_KEY } from '../configs/dotenv.config.js';

export const hashed_password = async (password) => {
  const salt_rounds = parseInt(SALT_ROUNDS);
  const hashed_password = await bcrypt.hash(password, salt_rounds);
  return hashed_password;
};

export const compare_password = async (password, hashed_password) => {
  const is_match = await bcrypt.compare(password, hashed_password);
  return is_match;
};

export const generate_token = (user) => {
  const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, JWT_SECRET_KEY, {
    expiresIn: '5m',
  });
  return token;
};

export const generate_refresh_token = (user) => {
  const refresh_token = jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    JWT_REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: '7d' }
  );
  return refresh_token;
};
