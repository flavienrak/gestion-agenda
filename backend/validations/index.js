import { param } from 'express-validator';

const idValidation = [
  param('id')
    .notEmpty()
    .withMessage('id required')
    .isInt()
    .withMessage('Invalid id'),
];

export { idValidation };
