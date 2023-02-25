import Joi from 'joi';
import { idSize, nanoidAlphabet } from '../utils/constants/nanoid.js';

export const createUrlSchema = Joi.object({
  url: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .required(),
});

export const openUrlSchema = Joi.object({
  shortUrl: Joi.string().required(),
});
