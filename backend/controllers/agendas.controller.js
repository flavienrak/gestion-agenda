import { validationResult } from 'express-validator';

import db from '../config/db.js';

const getAgendas = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = res.locals.user;

    const [agendas] = await db.execute(
      `
      SELECT *
      FROM agendas
      JOIN user_agenda ON user_agenda.agenda_id = agendas.id
      WHERE user_agenda.user_id = ?
    `,
      [user.id],
    );

    return res.status(200).json({ agendas });
  } catch (error) {
    return res.status(500).json({ error: `${error.message}` });
  }
};

const createAgenda = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const body = req.body;

    const startDate = new Date(body.start_date)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
    const endDate = new Date(body.end_date)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');

    const query = `
    INSERT INTO agendas (title, description, start_date, end_date)
    VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.execute(query, [
      body.title,
      body.description,
      startDate,
      endDate,
    ]);

    const [rows] = await db.execute('SELECT * FROM agendas WHERE id = ?', [
      result.insertId,
    ]);

    const user = res.locals.user;
    const agenda = rows[0];

    await db.execute(
      'INSERT INTO user_agenda (user_id, agenda_id) VALUES (?, ?)',
      [user.id, agenda.id],
    );

    return res.status(201).json({
      agenda: JSON.parse(JSON.stringify(agenda)),
    });
  } catch (error) {
    return res.status(500).json({ error: `${error.message}` });
  }
};

const updateAgenda = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const body = req.body;

    const [agendaRows] = await db.execute(
      'SELECT * FROM agendas WHERE id = ?',
      [id],
    );

    if (agendaRows.length === 0) {
      return res.status(200).json({ error: 'Agenda not found' });
    }

    const user = res.locals.user;
    const agenda = agendaRows[0];

    const [userAgendaRows] = await db.execute(
      'SELECT * FROM user_agenda WHERE user_id = ? AND agenda_id = ?',
      [user.id, agenda.id],
    );

    if (userAgendaRows.length === 0) {
      return res.status(403).json({ error: 'Unauthorized user' });
    }

    const startDate = body.start_date
      ? new Date(body.start_date).toISOString().slice(0, 19).replace('T', ' ')
      : agenda.start_date;

    const endDate = body.end_date
      ? new Date(body.end_date).toISOString().slice(0, 19).replace('T', ' ')
      : agenda.end_date;

    const updateQuery = `
      UPDATE agendas
      SET title = ?, description = ?, start_date = ?, end_date = ?
      WHERE id = ?
    `;
    await db.execute(updateQuery, [
      body.title || agenda.title,
      body.description || agenda.description,
      startDate,
      endDate,
      id,
    ]);

    const [updatedAgenda] = await db.execute(
      'SELECT * FROM agendas WHERE id = ?',
      [id],
    );

    return res.status(200).json({
      agenda: JSON.parse(JSON.stringify(updatedAgenda[0])),
    });
  } catch (error) {
    return res.status(500).json({ error: `${error.message}` });
  }
};

const deleteAgenda = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    const [agendaRows] = await db.execute(
      'SELECT * FROM agendas WHERE id = ?',
      [id],
    );

    if (agendaRows.length === 0) {
      return res.status(404).json({ error: 'Agenda not found' });
    }

    const user = res.locals.user;
    const agenda = agendaRows[0];

    const [userAgendaRows] = await db.execute(
      'SELECT * FROM user_agenda WHERE user_id = ? AND agenda_id = ?',
      [user.id, agenda.id],
    );

    if (userAgendaRows.length === 0) {
      return res.status(403).json({ error: 'Unauthorized user' });
    }

    await db.execute('DELETE FROM agendas WHERE id = ?', [id]);

    return res.status(200).json({ agenda: JSON.parse(JSON.stringify(agenda)) });
  } catch (error) {
    return res.status(500).json({ error: `${error.message}` });
  }
};

export { getAgendas, createAgenda, updateAgenda, deleteAgenda };
