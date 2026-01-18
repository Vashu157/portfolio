/**
 * Basic Authentication Middleware
 * Protects POST, PATCH, PUT, and DELETE operations
 */
const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Protected API"');
    return res.status(401).json({
      success: false,
      error: 'Authentication Required',
      message: 'Please provide valid credentials'
    });
  }

  try {
    // Decode Base64 credentials
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    // Validate credentials against environment variables
    const validUsername = process.env.BASIC_AUTH_USERNAME || 'admin';
    const validPassword = process.env.BASIC_AUTH_PASSWORD || 'password';

    if (username === validUsername && password === validPassword) {
      next();
    } else {
      res.setHeader('WWW-Authenticate', 'Basic realm="Protected API"');
      return res.status(401).json({
        success: false,
        error: 'Authentication Failed',
        message: 'Invalid credentials'
      });
    }
  } catch (error) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Protected API"');
    return res.status(401).json({
      success: false,
      error: 'Authentication Error',
      message: 'Failed to authenticate request'
    });
  }
};

export default basicAuth;
