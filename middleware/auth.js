// Simple authentication middleware using JWT in cookies or headers
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticate = async (req, res, next) => {
  try {
    let token = req.cookies?.token || req.headers['authorization'];
    if (token && token.startsWith('Bearer ')) token = token.slice(7);
    if (!token) {
      console.warn('[Auth] No token provided in request');
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const secret = process.env.JWT_SECRET || 'default-jwt-secret-key';
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id);
    if (!user) {
      console.warn(`[Auth] User not found for id: ${decoded.id}`);
      return res.status(401).json({ error: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (err) {
    console.error('[Auth] Token verification failed:', err.message);
    res.status(401).json({ error: 'Invalid token', details: err.message });
  }
};
