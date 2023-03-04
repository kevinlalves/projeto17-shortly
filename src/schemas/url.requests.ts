import { ParamsDictionary } from 'express-serve-static-core';
import Joi, { ObjectSchema } from 'joi';

export const createUrlSchema: ObjectSchema<ParamsDictionary> = Joi.object({
  url: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .required(),
});

export const openUrlSchema: ObjectSchema<ParamsDictionary> = Joi.object({
  shortUrl: Joi.string().required(),
});
