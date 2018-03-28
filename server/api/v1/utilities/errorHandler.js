exports.handleAPIError = function(msg, next) {
  const error = new Error(msg);
  error.status = 404;
  return next(error);
}