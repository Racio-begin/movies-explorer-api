const { BAD_REQUEST_ERROR } = require('../utils/ServerResponseStatuses');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_ERROR;
  }
}

module.exports = BadRequestError;
