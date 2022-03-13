import * as Joi from 'joi';

export const ConfigValidation = Joi.object({
  PORT: Joi.string().default(3000),
  DATABASE_URI: Joi.string().default('mongodb://localhost:27017/bonus-db'),
  ACCESS_TOKEN_SECRET: Joi.string().default('secret_key'),
});
