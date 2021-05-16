const Joi = require('joi');

const validateUser = user => {
  const schema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });

  return schema.validate(user);
}

const validateLoginData = loginData => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  return schema.validate(loginData);
}

module.exports = {
  validateUser,
  validateLoginData
};