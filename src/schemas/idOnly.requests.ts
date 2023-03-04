import { ParamsDictionary } from 'express-serve-static-core';
import Joi, { ObjectSchema } from 'joi';

const idOnlySchema: ObjectSchema<ParamsDictionary> = Joi.object({
  id: Joi.number().integer().min(1).required(),
});

export default idOnlySchema;
