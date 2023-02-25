import db from '../database/database.connection.js';

export const up = async () => {
  try {
    await db.query(`
      CREATE TABLE users (
        id serial PRIMARY KEY,
        name text NOT NULL,
        email text NOT NULL UNIQUE,
        password text NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now()
      );

      SELECT create_update_trigger('users');
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
