import { QueryResult } from 'pg';
import db from '../database/database.connection.js';
import { Credentials } from '../types/credentials.js';

export const findEmail = (email: string): Promise<QueryResult<Credentials>> =>
  db.query(
    `
      SELECT password, id as "userId"
      FROM users
      WHERE email = $1;
    `,
    [email]
  );
