function errorHandler(error, request, response, next) {
  console.error(error);

  if (response.headersSent) {
    return next(error);
  }

  if (error.name === "ZodError" && Array.isArray(error.issues)) {
    return response.status(400).json({
      message: "Validation failed",
      issues: error.issues.map((issue) => ({
        path: issue.path,
        message: issue.message,
      })),
    });
  }

  response.status(error.statusCode || 500).json({
    message: error.message || "Something went wrong",
  });
}

module.exports = { errorHandler };
