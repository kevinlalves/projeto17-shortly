import chalk from 'chalk';
import db from '../database/database.connection.js';
import { signinQuery } from '../queries/auth.queries.js';
import internalError from '../utils/functions/internalError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtSecret, jwtTokenDuration } from '../utils/constants/jwt.js';

export const signin = async (req, res) => {
  const { email, password } = req.Params;
  console.log(chalk.cyan('POST /signin'));

  try {
    const {
      rows: [user],
    } = await db.query(signinQuery(), [email]);
    if (!user) return res.status(401).send('Invalid credentials');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).send('Invalid credentials');

    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: jwtTokenDuration });

    return res.json({ token });
  } catch (error) {
    internalError(error, res);
  }
};
