import jwt from 'jsonwebtoken';
import { jwtSecret } from '../utils/constants/jwt';

const autheticate = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send();
  }

  try {
    const { userId } = jwt.verify(token, jwtSecret);

    res.locals = { userId };
  } catch (error) {
    console.log(error);

    return res.status(401).send();
  }

  next();
};

export default autheticate;
