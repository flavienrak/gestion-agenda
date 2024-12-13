import express from 'express';

import { getUser } from '../controllers/users.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { idValidation } from '../validations/index.js';

const router = express.Router();

router.get('/:id', isAuthenticated, idValidation, getUser);

export default router;
