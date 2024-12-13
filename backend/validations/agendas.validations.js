import { body } from 'express-validator';

const createAgendaValidations = [
  body('title').notEmpty().withMessage('title required'),
  body('description').notEmpty().withMessage('description required'),
  body('start_date')
    .notEmpty()
    .withMessage('start_date required')
    .isISO8601()
    .withMessage('Invalid start_date'),
  body('end_date')
    .notEmpty()
    .withMessage('end_date required')
    .isISO8601()
    .withMessage('Invalid end_date')
    .custom((value, { req }) => {
      const startDate = new Date(req.body.start_date);
      const endDate = new Date(value);

      if (endDate <= startDate) {
        throw new Error('end_date before start_date');
      }
      return true;
    }),
];

const updateAgendaValidations = [
  body('title').optional().notEmpty().withMessage('title required'),
  body('description').optional().notEmpty().withMessage('description required'),
  body('start_date')
    .optional()
    .notEmpty()
    .withMessage('start_date required')
    .isISO8601()
    .withMessage('Invalid start_date'),
  body('end_date')
    .optional()
    .notEmpty()
    .withMessage('end_date required')
    .isISO8601()
    .withMessage('Invalid end_date')
    .custom((value, { req }) => {
      const startDate = new Date(req.body.start_date);
      const endDate = new Date(value);

      if (endDate <= startDate) {
        throw new Error('end_date before start_date');
      }
      return true;
    }),
];

export { createAgendaValidations, updateAgendaValidations };
