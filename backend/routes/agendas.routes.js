import express from 'express';

import {
  createAgenda,
  deleteAgenda,
  getAgendas,
  updateAgenda,
} from '../controllers/agendas.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { idValidation } from '../validations/index.js';
import {
  createAgendaValidations,
  updateAgendaValidations,
} from '../validations/agendas.validations.js';

const router = express.Router();

router.get('/', isAuthenticated, getAgendas);
router.post('/', isAuthenticated, createAgendaValidations, createAgenda);
router.put(
  '/:id',
  isAuthenticated,
  [idValidation, updateAgendaValidations],
  updateAgenda,
);
router.delete('/:id', isAuthenticated, idValidation, deleteAgenda);

export default router;
