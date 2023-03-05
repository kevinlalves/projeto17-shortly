import Joi, { ObjectSchema } from 'joi';
import { GenericObject } from '../types/object';

export const createUrlSchema: ObjectSchema<GenericObject> = Joi.object({
  url: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .required(),
});

export const openUrlSchema: ObjectSchema<GenericObject> = Joi.object({
  shortUrl: Joi.string().required(),
});
