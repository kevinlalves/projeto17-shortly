import { ParamsDictionary } from 'express-serve-static-core';
import Joi, { ObjectSchema } from 'joi';

export const signupSchema: ObjectSchema<ParamsDictionary> = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.valid(Joi.ref('password')).required(),
});

export const rankUsersSchema: ObjectSchema<ParamsDictionary> = Joi.object({
  limit: Joi.number().integer().min(1),
  offset: Joi.number().integer().min(0),
  orientation: Joi.string().valid('asc', 'desc'),
});
