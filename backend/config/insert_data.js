import bcrypt from 'bcrypt';
import logger from '../utils/logger.js';
import db from './db.js';
import { salt } from '../utils/constants.js';

const users = [
  { name: 'Alice', email: 'alice@gmail.com', password: 'password1' },
  { name: 'Bob', email: 'bob@gmail.com', password: 'password2' },
  { name: 'Charlie', email: 'charlie@gmail.com', password: 'password3' },
];

const agendas = [
  {
    title: "Réunion d'équipe",
    description: "Réunion hebdomadaire avec l'équipe.",
    start_date: '2024-12-13 10:00:00',
    end_date: '2024-12-13 11:00:00',
  },
  {
    title: 'Présentation client',
    description: 'Présentation des nouveaux produits.',
    start_date: '2024-12-14 14:00:00',
    end_date: '2024-12-14 15:30:00',
  },
  {
    title: 'Formation interne',
    description: 'Formation sur les nouvelles technologies.',
    start_date: '2024-12-15 09:00:00',
    end_date: '2024-12-15 12:00:00',
  },
];

const userAgenda = [
  { user_id: 1, agenda_id: 1 },
  { user_id: 2, agenda_id: 2 },
  { user_id: 3, agenda_id: 3 },
  { user_id: 1, agenda_id: 3 },
];

const insertData = async () => {
  try {
    for (let user of users) {
      user.password = await bcrypt.hash(user.password, salt);
    }

    for (const user of users) {
      await db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [user.name, user.email, user.password],
      );
    }
    logger.info('Data inserted into users');

    for (const agenda of agendas) {
      await db.query(
        'INSERT INTO agendas (title, description, start_date, end_date) VALUES (?, ?, ?, ?)',
        [agenda.title, agenda.description, agenda.start_date, agenda.end_date],
      );
    }
    logger.info('Data inserted into agendas');

    for (const ua of userAgenda) {
      await db.query(
        'INSERT INTO user_agenda (user_id, agenda_id) VALUES (?, ?)',
        [ua.user_id, ua.agenda_id],
      );
    }
    logger.info('Data inserted into user_agenda');
  } catch (error) {
    logger.error('Data insertion error :', error);
  } finally {
    process.exit();
  }
};

insertData();
