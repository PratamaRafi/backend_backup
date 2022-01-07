function errorHandler(err, req, res,next) {
  const status = err.status || 500
  res.status(status).json({
    message: err.message || 'Something went wrong. Please try again later.',
    status
  })
  
}

module.exports = errorHandler;