import db from '../database/database.connection.js';

export const findEmail = (email: string) =>
  db.query(
    `
      SELECT password, id
      FROM users
      WHERE email = $1;
    `,
    [email]
  );
