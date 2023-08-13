const jwt = require('jsonwebtoken');

const config = require('../utils/config');

const UnauthorizedError = require('../errors/UnauthorizedError');

const extractBearerToken = (header) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация!'));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(
      token,
      config.JWT_SECRET,
    );
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация!'));
  }

  req.user = payload;

  next();
};
