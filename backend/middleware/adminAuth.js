import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
  try {
    // Check for Authorization header
    const authHeader = req.headers.authorization;

    // If no header or header doesn't start with 'Bearer ', reject
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided, authorization denied',
      });
    }

    // Extract the token from header
    const token = authHeader.split(' ')[1];

    // Verify the token with your JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if decoded token contains admin role or matches admin email
    if (decoded.role !== 'admin' && decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized as admin',
      });
    }

    // Attach decoded admin info to request object for downstream use
    req.admin = decoded;

    // All good, continue
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);

    // Token invalid or expired
    return res.status(401).json({
      success: false,
      message: 'Token is not valid or expired',
    });
  }
};

export default adminAuth;
