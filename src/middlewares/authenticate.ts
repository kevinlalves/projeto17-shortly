import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../utils/constants/jwt.js';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send();
  }

  try {
    const { userId } = jwt.verify(token, jwtSecret) as { userId: string };
    req.params = { userId, ...req.params };
  } catch (error) {
    return res.status(401).send();
  }

  next();
};

export default authenticate;
