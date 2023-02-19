import db from '../database/database.connection.js';

export const up = async () => {
  try {
    await db.query(`
      CREATE TABLE users (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        name text NOT NULL,
        email text NOT NULL UNIQUE,
        password text NOT NULL
      );
    `);
  } catch (error) {
    return error;
  }
};

export const down = async () => {
  try {
    await db.query('DROP TABLE users;');
  } catch (error) {
    return error;
  }
};
