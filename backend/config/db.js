import mysql from 'mysql2';
import dotenv from 'dotenv';
import { envRoute } from '../utils/constants.js';

dotenv.config({ path: envRoute });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
});

const db = pool.promise();

export default db;
