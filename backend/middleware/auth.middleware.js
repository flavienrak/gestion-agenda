import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import db from '../config/db.js';
import { authTokenName, envRoute } from '../utils/constants.js';

dotenv.config({ path: envRoute });
const key = process.env.JWT_SECRET;

const checkUser = async (req, res, next) => {
  const token = req.cookies[authTokenName];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded?.infos) {
        const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [
          decoded.infos.id,
        ]);

        if (rows.length > 0) {
          const user = rows[0];
          delete user.password;
          res.locals.user = user;
        } else {
          res.locals.user = null;
          res.cookie(authTokenName, '', { maxAge: -1 });
        }
      }
    } catch (error) {
      res.locals.user = null;
      res.cookie(authTokenName, '', { maxAge: -1 });
    }
  } else {
    res.locals.user = null;
  }

  next();
};

const requireAuth = async (req, res) => {
  const token = req.cookies[authTokenName];

  if (token) {
    try {
      const decoded = jwt.verify(token, key);

      if (decoded?.infos) {
        const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [
          decoded.infos.id,
        ]);

        if (rows.length > 0) {
          const user = rows[0];
          delete user.password;
          return res.status(200).json({ user });
        } else {
          res.cookie(authTokenName, '', { maxAge: -1 });
          return res.status(404).json({ error: 'User not found' });
        }
      }
    } catch (error) {
      res.cookie(authTokenName, '', { maxAge: -1 });
      return res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    return res.json({ error: 'token required' });
  }
};

const isAuthenticated = (req, res, next) => {
  if (res.locals.user) {
    next();
  } else {
    res.status(403).json({ error: 'Unauthorized user' });
  }
};

export { checkUser, requireAuth, isAuthenticated };
