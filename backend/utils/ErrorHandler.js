class ErrorHandler extends Error {       // Error is default class in nodejs
  constructor(message, statusCode) {
    super(message);     // super is used to call parent class constructor
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}


module.exports = ErrorHandler;