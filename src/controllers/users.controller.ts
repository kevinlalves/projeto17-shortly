import chalk from 'chalk';
import { valueAlreadyExistsError } from '../utils/constants/postgres.js';
import internalError from '../utils/functions/internalError.js';
import bcrypt from 'bcrypt';
import { saltRounds } from '../utils/constants/bcrypt.js';
import { standardBatch } from '../utils/constants/queries.js';
import { createUser, getCurrentUser, getUsersRanked } from '../repositories/users.repository.js';
import { Request, Response } from 'express';
import { ErrnoException } from '../types/utils/errors.js';
import { ParamsDictionary } from 'express-serve-static-core';

export const rankUsers = async (req: Request, res: Response) => {
  const { limit = standardBatch, offset = '0', orientation = 'desc' }: ParamsDictionary = req.params;
  console.log(chalk.cyan('GET /ranking'));

  try {
    const { rows: users } = await getUsersRanked({ orientation, offset, limit });

    return res.json(users);
  } catch (error) {
    internalError(error as ErrnoException, res);
  }
};

export const showCurrentUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(chalk.cyan('GET /users/me'));

  try {
    const {
      rows: [user],
    } = await getCurrentUser(userId);

    return res.json(user);
  } catch (error) {
    internalError(error as ErrnoException, res);
  }
};

export const signup = async (req: Request, res: Response) => {
  const { name, email, password }: ParamsDictionary = req.params;
  console.log(chalk.cyan('POST /signup'));

  try {
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    await createUser({ name, email, encryptedPassword });

    return res.status(201).send();
  } catch (error) {
    if ((error as ErrnoException).code === valueAlreadyExistsError)
      return res.status(409).send('Email already registered');

    internalError(error as ErrnoException, res);
  }
};
