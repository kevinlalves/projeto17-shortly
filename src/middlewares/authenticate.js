import jwt from 'jsonwebtoken';
import { jwtSecret } from '../utils/constants/jwt.js';

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send();
  }

  try {
    req.Params = { ...jwt.verify(token, jwtSecret), ...req.Params };
  } catch (error) {
    return res.status(401).send();
  }

  next();
};

export default authenticate;
