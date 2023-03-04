import db from '../database/database.connection.js';
import { ErrnoException } from '../types/utils/errors.js';

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
