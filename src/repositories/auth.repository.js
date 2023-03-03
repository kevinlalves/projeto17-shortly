import db from '../database/database.connection.js';

export const findEmail = (email) =>
  db.query(
    `
      SELECT password, id
      FROM users
      WHERE email = $1;
    `,
    [email]
  );
