import fs from 'fs';
import path from 'path';

import db from './db.js';
import logger from '../utils/logger.js';
import { __dirname } from '../server.js';

async function runMigrations() {
  const migrationPath = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(migrationPath).sort();

  try {
    await db.query(`
            CREATE TABLE IF NOT EXISTS migrations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

    for (const file of files) {
      const filePath = path.join(migrationPath, file);
      if (path.extname(filePath) === '.sql') {
        const [[existingMigration]] = await db.query(
          'SELECT * FROM migrations WHERE name = ?',
          [file],
        );

        if (!existingMigration) {
          logger.info(`Execute : ${file}`);
          const sql = fs.readFileSync(filePath, 'utf8');
          await db.query(sql);

          await db.query('INSERT INTO migrations (name) VALUES (?)', [file]);
        } else {
          logger.info(`Already migrated : ${file}`);
        }
      }
    }

    logger.info('Migrations success');
  } catch (err) {
    logger.error('Migrations error :', err);
  } finally {
    db.end();
    process.exit();
  }
}

runMigrations();
