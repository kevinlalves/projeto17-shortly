import db from '../database/database.connection.js';

export const up = async () => {
  try {
    await db.query(`
      CREATE FUNCTION update_updated_at() RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE FUNCTION create_update_trigger(table_name text) RETURNS VOID AS $$
      BEGIN
        EXECUTE format('
          CREATE TRIGGER update_%I_updated_at
          BEFORE UPDATE
          ON %I
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at()',
          table_name, table_name
        );
      END;
      $$ LANGUAGE plpgsql;
    `);
  } catch (error) {
    return error;
  }
};

export const down = async () => {
  try {
    await db.query(`
      DROP FUNCTION IF EXISTS create_update_trigger(text);
      DROP FUNCTION IF EXISTS update_updated_at();
    `);
  } catch (error) {
    return error;
  }
};
