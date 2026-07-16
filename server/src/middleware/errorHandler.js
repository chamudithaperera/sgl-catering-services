function errorHandler(error, request, response, next) {
  console.error(error);

  if (response.headersSent) {
    return next(error);
  }

  response.status(error.statusCode || 500).json({
    message: error.message || "Something went wrong",
  });
}

module.exports = { errorHandler };

