import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ObjectSchema } from 'joi';
import sanitizeObject from '../utils/functions/sanitizeObject.js';

const processRequestParams = (schema: ObjectSchema<ParamsDictionary>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.params = sanitizeObject({ ...req.body, ...req.params, ...req.query });
    const { error } = schema.validate(req.params, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);

      return res.status(422).send(errorMessages);
    }

    next();
  };
};

export default processRequestParams;
