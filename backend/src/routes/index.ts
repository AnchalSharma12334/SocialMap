import { Router } from 'express';
import authRoutes from './auth.routes';

const router = Router();

// Add debug logging
console.log('Setting up main routes file');

// Auth routes - /api/auth
router.use('/auth', authRoutes);

// Debug route to confirm routes are working
router.get('/debug', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Debug route is working!',
    availableRoutes: ['/auth/register', '/auth/login', '/auth/google', '/auth/me'] 
  });
});

export default router;