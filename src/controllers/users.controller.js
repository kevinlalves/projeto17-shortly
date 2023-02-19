import chalk from 'chalk';
import db from '../database/database.connection.js';
import { rankUsersQuery, showCurrentUserQuery, signupQuery } from '../queries/users.queries.js';
import { valueAlreadyExistsError } from '../utils/constants/postgres.js';
import internalError from '../utils/functions/internalError.js';
import bcrypt from 'bcrypt';
import { saltRounds } from '../utils/constants/bcrypt.js';
import { standardBatch } from '../utils/constants/queries.js';

export const rankUsers = async (req, res) => {
  const { limit = standardBatch, offset = 0, orietation = 'desc' } = req.Params;
  console.log(chalk.cyan('GET /ranking'));

  try {
    const { rows: users } = await db.query(rankUsersQuery(orietation), [offset, limit]);

    return res.json(users);
  } catch (error) {
    internalError(error, res);
  }
};

export const showCurrentUser = async (req, res) => {
  const { userId } = req.Params;
  console.log(chalk.cyan('GET /users/me'));

  try {
    const {
      rows: [user],
    } = await db.query(showCurrentUserQuery(), [userId]);

    return res.json(user);
  } catch (error) {
    internalError(error, res);
  }
};

export const signup = async (req, res) => {
  const { name, email, password } = req.Params;
  console.log(chalk.cyan('POST /signup'));

  try {
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    await db.query(signupQuery(), [name, email, encryptedPassword]);

    return res.status(201).send();
  } catch (error) {
    if (error.code === valueAlreadyExistsError) return res.status(409).send('Email already registered');

    internalError(error, res);
  }
};
