import { Response } from 'express';
import { ErrnoException } from '../../types/utils/errors.js';

const internalError = (error: ErrnoException, res: Response) => {
  console.log(error);

  return res.status(500).send("We're having server side problems, try again in a moment");
};

export default internalError;
