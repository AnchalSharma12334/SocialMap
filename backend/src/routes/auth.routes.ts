import { Router } from 'express';
import { check } from 'express-validator';
import { 
  register, 
  login, 
  getMe, 
  updateProfile, 
  changePassword,
  googleAuth
} from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// Log route setup
console.log('Setting up auth routes, including /google endpoint');

// Register route with validation
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password')
      .if((value, { req }) => !req.body.firebaseId) // Only validate password if no firebaseId
      .isLength({ min: 6 }).withMessage('Password must be 6 or more characters')
      .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
      .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character'),
  ],
  register
);

// Login route with validation
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required')
      .if((value, { req }) => !req.body.firebaseId) // Only require password if no firebaseId
      .exists(),
  ],
  login
);

// Google auth route
router.post('/google', (req, res, next) => {
  console.log('Google auth route hit:', req.path);
  console.log('Request body:', JSON.stringify(req.body));
  googleAuth(req, res);
});

// Protected routes
router.get('/me', protect, getMe);
router.put('/me', protect, updateProfile);
router.put(
  '/password',
  [
    protect,
    check('currentPassword', 'Current password is required').exists(),
    check('newPassword')
      .isLength({ min: 6 }).withMessage('New password must be 6 or more characters')
      .matches(/[A-Z]/).withMessage('New password must contain at least one uppercase letter')
      .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('New password must contain at least one special character'),
  ],
  changePassword
);

export default router;