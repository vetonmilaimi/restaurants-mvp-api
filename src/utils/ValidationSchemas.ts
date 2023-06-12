import Joi from "joi";

class ValidationSchemas {
  static login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  static register = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    username: Joi.string().lowercase().required(),
  });

  static changeUserDetails = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
  });

  static token = Joi.object({
    access_token: Joi.string().required(),
    refresh_token: Joi.string().required(),
  });

  static accessToken = Joi.object({
    access_token: Joi.string().required(),
  });
}

export default ValidationSchemas;
