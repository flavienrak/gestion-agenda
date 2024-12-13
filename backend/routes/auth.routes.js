import express from 'express';
import { login, logout } from '../controllers/auth.controller.js';
import { loginValidations } from '../validations/auth.validations.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', loginValidations, login);
router.get('/logout', isAuthenticated, logout);

export default router;
