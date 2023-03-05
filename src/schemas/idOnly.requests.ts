import Joi, { ObjectSchema } from 'joi';
import { GenericObject } from '../types/object';

const idOnlySchema: ObjectSchema<GenericObject> = Joi.object({
  id: Joi.number().integer().min(1).required(),
});

export default idOnlySchema;
