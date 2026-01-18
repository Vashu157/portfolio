/**
 * Centralized error handling middleware
 * Catches all errors passed via next(err) and returns clean JSON responses
 */
const errorHandler = (err, req, res, next) => {
  // Log error for debugging (in production, use a proper logging service)
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);

  // Default error status and message
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: message,
      details: err.details || err.errors
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID format',
      message: 'The provided ID is not valid'
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      error: 'Duplicate Entry',
      message: 'A record with this value already exists'
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: 'Invalid Token',
      message: 'Authentication token is invalid'
    });
  }

  // Generic error response
  res.status(statusCode).json({
    success: false,
    error: err.name || 'Error',
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export default errorHandler;
