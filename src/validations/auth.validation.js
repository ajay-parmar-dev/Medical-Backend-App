const Joi = require('joi');

const signup = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required(),
  role: Joi.string().valid('ADMIN', 'DOCTOR', 'PATIENT', 'NURSE', 'STAFF').optional(),
});

const login = Joi.object({
  emailOrUsername: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { signup, login };


