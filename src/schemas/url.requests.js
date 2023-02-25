import Joi from 'joi';

export const createUrlSchema = Joi.object({
  url: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .required(),
});

export const openUrlSchema = Joi.object({
  shortUrl: Joi.string().required(),
});
