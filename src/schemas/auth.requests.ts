import Joi, { ObjectSchema } from 'joi';
import { GenericObject } from '../types/object';

export const signinSchema: ObjectSchema<GenericObject> = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
