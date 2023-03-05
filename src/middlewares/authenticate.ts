import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../utils/constants/jwt.js';

const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    res.status(401).send();
    return;
  }

  try {
    const { userId } = jwt.verify(token, jwtSecret) as { userId: string };
    res.locals = { userId, ...res.locals };
  } catch (error) {
    res.status(401).send();
    return;
  }

  next();
};

export default authenticate;
