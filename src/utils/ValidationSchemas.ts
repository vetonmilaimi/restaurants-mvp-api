import Joi from "joi";
import { PASSWORD_REGEX } from "./constants";

class ValidationSchemas {
  static login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  static register = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(PASSWORD_REGEX).required(),
    username: Joi.string().lowercase().required(),
  });

  static changeUserDetails = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
  });

  static changePassword = Joi.object({
    password: Joi.string().regex(PASSWORD_REGEX).required(),
  });

  static token = Joi.object({
    access_token: Joi.string().required(),
    refresh_token: Joi.string().required(),
  });

  static accessToken = Joi.object({
    access_token: Joi.string(),
  });
}

export default ValidationSchemas;
