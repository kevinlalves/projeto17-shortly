import chalk from 'chalk';
import db from '../database/database.connection.js';
import { signupQuery } from '../queries/users.queries.js';
import { valueAlreadyExistsError } from '../utils/constants/postgres.js';
import internalError from '../utils/functions/internalError.js';
import bcrypt from 'bcrypt';
import { saltRounds } from '../utils/constants/bcrypt.js';

export const rankUsers = async (req, res) => {};

export const showCurrentUser = async (req, res) => {};

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
