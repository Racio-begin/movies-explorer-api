const { celebrate, Joi } = require('celebrate');

const RegExUrl = require('../utils/RegExUrl');

const createUserJoiValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const loginJoiValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const updateUserInfoJoiValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const movieJoiValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(RegExUrl),
    trailerLink: Joi.string().required().regex(RegExUrl),
    thumbnail: Joi.string().required().regex(RegExUrl),
    moviedId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    // owner:
  }),
});

const movieIdJoiValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  createUserJoiValidation,
  updateUserInfoJoiValidation,
  loginJoiValidation,
  movieJoiValidation,
  movieIdJoiValidation,
};
