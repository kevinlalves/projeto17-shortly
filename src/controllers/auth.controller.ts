import chalk from 'chalk';
import internalError from '../utils/functions/internalError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtSecret, jwtTokenDuration } from '../utils/constants/jwt.js';
import { findEmail } from '../repositories/auth.repository.js';
import { Request, Response } from 'express';
import { ErrnoException } from '../types/error.js';

export const signin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = res.locals as { email: string; password: string };
  console.log(chalk.cyan('POST /signin'));

  try {
    const {
      rows: [user],
    } = await findEmail(email);
    if (!user) {
      res.status(401).send('Invalid credentials');
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).send('Invalid credentials');
      return;
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: jwtTokenDuration });

    res.json({ token });
  } catch (error) {
    internalError(error as ErrnoException, res);
  }
};
