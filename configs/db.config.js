import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER, NODE_ENV } from './dotenv.config.js';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  timezone: '+05:30',
});

const ensure_db_exists = async () => {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
  await connection.end();
};

const connect_db = async () => {
  try {
    if (NODE_ENV === 'development') {
      await ensure_db_exists();
    }
    await sequelize.authenticate();
    console.log('Connected to MySQL DB...');
  } catch (error) {
    console.error('DB connection error:', error);
  }
};

export { sequelize, connect_db };
