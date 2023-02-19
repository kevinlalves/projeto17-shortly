import db from '../database/database.connection.js';

export const up = async () => {
  try {
    await db.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  } catch (error) {
    return error;
  }
};

export const down = async () => {
  try {
    await db.query('DROP EXTENSION IF EXISTS "uuid-ossp"');
  } catch (error) {
    return error;
  }
};
