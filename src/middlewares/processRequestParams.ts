import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import { GenericObject } from '../types/object.js';
import sanitizeObject from '../utils/functions/sanitizeObject.js';

const processRequestParams = (schema: ObjectSchema<GenericObject>) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.locals = sanitizeObject({ ...req.body, ...req.params, ...req.query });
    const { error } = schema.validate(res.locals, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);

      res.status(422).send(errorMessages);
      return;
    }

    next();
  };
};

export default processRequestParams;
