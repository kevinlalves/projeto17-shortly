import chalk from 'chalk';
import { valueAlreadyExistsError } from '../utils/constants/postgres.js';
import internalError from '../utils/functions/internalError.js';
import bcrypt from 'bcrypt';
import { saltRounds } from '../utils/constants/bcrypt.js';
import { standardBatch } from '../utils/constants/queries.js';
import { createUser, getCurrentUser, getUsersRanked } from '../repositories/users.repository.js';
import { Request, Response } from 'express';
import { ErrnoException } from '../types/error.js';

export const rankUsers = async (req: Request, res: Response): Promise<void> => {
  const {
    limit = standardBatch,
    offset = 0,
    orientation = 'desc',
  } = res.locals as { limit: number; offset: number; orientation: string };
  console.log(chalk.cyan('GET /ranking'));

  try {
    const { rows: users } = await getUsersRanked({ orientation, offset, limit });

    res.json(users);
  } catch (error) {
    internalError(error as ErrnoException, res);
  }
};

export const showCurrentUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = res.locals as { userId: string };
  console.log(chalk.cyan('GET /users/me'));

  try {
    const {
      rows: [user],
    } = await getCurrentUser(userId);

    res.json(user);
  } catch (error) {
    internalError(error as ErrnoException, res);
  }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = res.locals as { name: string; email: string; password: string };
  console.log(chalk.cyan('POST /signup'));

  try {
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    await createUser({ name, email, encryptedPassword });

    res.status(201).send();
  } catch (error) {
    if ((error as ErrnoException).code === valueAlreadyExistsError) {
      res.status(409).send('Email already registered');
      return;
    }

    internalError(error as ErrnoException, res);
  }
};
