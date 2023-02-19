import db from '../database/database.connection.js';

export const up = async () => {
  try {
    await db.query(`
      CREATE TABLE urls (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        short_url text NOT NULL UNIQUE,
        url text NOT NULL UNIQUE,
        user_id uuid NOT NULL REFERENCES users,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
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
