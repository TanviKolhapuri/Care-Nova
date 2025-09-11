// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const JWT_SECRET = process.env.JWT_SECRET || 'sunidhi';

export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
    
  // Check for Bearer token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or malformed' });
  }

  const token = authHeader.split(' ')[1]; // Extract token after "Bearer"

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user to request (optional, based on your flow)
    const user = await User.findById(decoded.id).select('-password'); // don't include password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.details= user; 
    next(); 

  } catch (error) {
    console.error('Token verification failed:', error.message);
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};
