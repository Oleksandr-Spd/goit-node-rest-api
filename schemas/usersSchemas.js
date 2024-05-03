import Joi from "joi";

export const registerUserSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
});

export const loginUserSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const subscriptionUserSchema = Joi.object({
  subscription: Joi.string().required(),
});
