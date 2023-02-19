import Joi from 'joi';
import { idSize } from '../utils/constants/nanoid.js';

export const createUrlSchema = Joi.object({
  url: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .required(),
});

export const openUrlSchema = Joi.object({
  shortUrl: Joi.string().max(idSize).required(),
});
