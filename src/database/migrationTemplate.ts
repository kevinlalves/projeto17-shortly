import db from '../database/database.connection.js';
import { ErrnoException } from '../types/error.js';

export const up = async () => {
  try {
    await db.query(``);
  } catch (error) {
    return error as ErrnoException;
  }
};

export const down = async () => {
  try {
    await db.query(``);
  } catch (error) {
    return error as ErrnoException;
  }
};
