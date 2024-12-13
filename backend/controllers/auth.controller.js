import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import db from '../config/db.js';
import {
  authTokenName,
  envRoute,
  maxAgeAuthToken,
} from '../utils/constants.js';

dotenv.config({ path: envRoute });
const key = process.env.JWT_SECRET;

const login = async (req, res) => {
  try {
    let user = null;
    const body = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [
      body.email,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ userNotFound: true });
    }

    user = rows[0];

    const matchPassword = await bcrypt.compare(body.password, user.password);

    if (!matchPassword) {
      return res.status(401).json({ incorrectPassword: true });
    }

    const infos = {
      id: user.id,
      authToken: true,
    };

    const authToken = jwt.sign({ infos }, key, {
      expiresIn: maxAgeAuthToken,
    });
    const cookieOptions = {
      httpOnly: true,
      secure: false,
    };
    if (body.remember) {
      cookieOptions.maxAge = maxAgeAuthToken;
    }

    res.cookie(authTokenName, authToken, cookieOptions);

    delete user.password;
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: `${error.message}` });
  }
};

const logout = async (req, res) => {
  res.cookie(authTokenName, '', { maxAge: -1 });
  res.redirect('/');
};

export { login, logout };
