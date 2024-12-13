import { body } from 'express-validator';

const loginValidations = [
  body('remember')
    .notEmpty()
    .withMessage('remember required')
    .isBoolean()
    .withMessage('remember not boolean'),
  body('email')
    .notEmpty()
    .withMessage('email required')
    .isEmail()
    .withMessage('invalid email'),
  body('password')
    .notEmpty()
    .withMessage('password required')
    .isLength({ min: 6 })
    .withMessage('password less than 6 characters'),
];

const createUserValidations = [
  body('name').notEmpty().withMessage('name required'),
  body('email')
    .notEmpty()
    .withMessage('email required')
    .isEmail()
    .withMessage('email invalide'),
  body('password')
    .notEmpty()
    .withMessage('password required')
    .isLength({ min: 6 })
    .withMessage('password less than 6 characters'),
];

export { loginValidations, createUserValidations };
