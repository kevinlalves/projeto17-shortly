import chalk from 'chalk';
import { valueAlreadyExistsError } from '../utils/constants/postgres.js';
import internalError from '../utils/functions/internalError.js';
import bcrypt from 'bcrypt';
import { saltRounds } from '../utils/constants/bcrypt.js';
import { standardBatch } from '../utils/constants/queries.js';
import { createUser, getCurrentUser, getUsersRanked } from '../repositories/users.repository.js';

export const rankUsers = async (req, res) => {
  const { limit = standardBatch, offset = 0, orientation = 'desc' } = req.Params;
  console.log(chalk.cyan('GET /ranking'));

  try {
    const { rows: users } = await getUsersRanked({ orientation, offset, limit });

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
    } = await getCurrentUser(userId);

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
    await createUser({ name, email, encryptedPassword });

    return res.status(201).send();
  } catch (error) {
    if (error.code === valueAlreadyExistsError) return res.status(409).send('Email already registered');

    internalError(error, res);
  }
};
