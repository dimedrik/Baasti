const ErrorResponse = require("../utils/errorResponse");

/**
 *
 * @param {Object} err Error object thrown due to exception
 * @param {Object} req The request object from client
 * @param {Object} res The response object to be sent to client
 * @param {function} next The default express next function
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  // Mongoose duplicate key
  else if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  res.status(200).json({
    success: false,
    details: error,
    data:[]
  });
};

module.exports = errorHandler;
