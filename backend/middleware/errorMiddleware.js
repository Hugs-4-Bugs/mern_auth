// const notFound = (req, res, next) => {
//   const error = new Error(`Not Found - ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// };

// const errorHandler = (err, req, res, next) => {
//   let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   let message = err.message;

//   // If Mongoose not found error, set to 404 and change message
//   if (err.name === 'CastError' && err.kind === 'ObjectId') {
//     statusCode = 404;
//     message = 'Resource not found';
//   }

//   res.status(statusCode).json({
//     message: message,
//     stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//   });
// };

// export { notFound, errorHandler };





// Middleware for handling 404 errors
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// General error handler middleware
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Check if error is a Mongoose CastError for invalid ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Respond with error details
  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };

