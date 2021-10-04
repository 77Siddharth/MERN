const ErrorHandler = require("../Utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal Server Error";

  // wrong mongodb ID ERROR [ caste error ]
  if (err.name === "CastError") {
    const message = "Resource not found ";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
