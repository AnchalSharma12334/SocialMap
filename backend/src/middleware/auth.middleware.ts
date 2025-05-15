import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/auth.types';
import User from '../models/User';

// Middleware to protect routes that require authentication
export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token: string | undefined;

  // Get token from Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || 'fallback_secret';
    // @ts-ignore - Ignoring TypeScript error for jwt.verify
    const decoded = jwt.verify(token, secret) as { id: string };
    
    // Get user from database
    const user = await User.findById(decoded.id);
    
    if (!user) {
      res.status(401).json({ success: false, error: 'User not found' });
      return;
    }
    
    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }
};

// Middleware to restrict access to specific roles
export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authorized to access this route' });
      return;
    }
    
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ 
        success: false, 
        error: `User role ${req.user.role} is not authorized to access this route` 
      });
      return;
    }
    
    next();
  };
};