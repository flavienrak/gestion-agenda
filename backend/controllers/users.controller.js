import { validationResult } from 'express-validator';

import db from '../config/db.js';

const getUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = rows[0];
    delete user.password;

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: `${error.message}` });
  }
};

export { getUser };
