import db from '../database/database.connection.js';

export const up = async () => {
  try {
    await db.query(`
      CREATE TABLE urls (
        id serial PRIMARY KEY,
        short_url text NOT NULL UNIQUE,
        url text NOT NULL UNIQUE,
        visit_count integer NOT NULL DEFAULT 0,
        user_id serial NOT NULL REFERENCES users,
        created_at timestamptz NOT NULL DEFAULT now()
      );

      SELECT create_update_trigger('urls');
    `);
  } catch (error) {
    return error;
  }
};

export const down = async () => {
  try {
    await db.query('DROP TABLE urls');
  } catch (error) {
    return error;
  }
};
