import express from 'express';
import cookieParser from 'cookie-parser';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import { fileURLToPath } from 'url';
import { requireAuth, checkUser } from './middleware/auth.middleware.js';

import logger from './utils/logger.js';
import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import agendasRoutes from './routes/agendas.routes.js';
import { envRoute } from './utils/constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

dotenv.config({ path: envRoute });

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin);
    },
    credentials: true,
    preflightContinue: false,
    allowedHeaders: ['sessionId', 'Content-Type'],
    exposedHeaders: ['sessionId'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

app.use('/api', checkUser);
app.use('/api/auth', authRoutes);
app.use('/api/user', usersRoutes);
app.use('/api/agendas', agendasRoutes);

app.get('/', (req, res) => {
  return res.json('Welcome to express!');
});
app.get('/api/jwtid', requireAuth);

const port = process.env.PORT;
server.listen(port, () => logger.info(`App runing at: ${port}`));

export { __dirname };
