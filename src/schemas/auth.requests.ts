import { ParamsDictionary } from 'express-serve-static-core';
import Joi, { ObjectSchema } from 'joi';

export const signinSchema: ObjectSchema<ParamsDictionary> = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
