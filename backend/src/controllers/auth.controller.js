const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const passport = require('passport');

// Helper function to generate JWT
const generateToken = (id) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.sign({ id: id.toString() }, secret, {
    expiresIn: process.env.JWT_EXPIRATION || '7d',
  });
};

// Helper function to handle social auth response
const handleSocialAuthResponse = async (req, res, profile) => {
  try {
    let user = await User.findOne({ email: profile.email });
    
    if (!user) {
      user = await User.create({
        name: profile.displayName,
        email: profile.email,
        password: Math.random().toString(36).slice(-8), // Random password for social auth
        avatar: profile.photos?.[0]?.value,
        provider: profile.provider
      });
    }

    const token = generateToken(user._id);
    
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Social auth error:', error);
    res.status(500).json({ success: false, error: 'Server error during social authentication' });
  }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
      return;
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ success: false, error: 'User already registered with this email address' });
      return;
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      provider: 'local'
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, error: 'Server error during registration' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
      return;
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || user.provider !== 'local') {
      res.status(401).json({ 
        success: false, 
        error: user?.provider ? 'Please login using your social account' : 'Invalid credentials'
      });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Server error during login' });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = req.user;
    
    if (!user) {
      res.status(401).json({ success: false, error: 'Not authorized' });
      return;
    }
    
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ success: false, error: 'Server error getting user profile' });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const user = req.user;
    
    if (!user) {
      res.status(401).json({ success: false, error: 'Not authorized' });
      return;
    }
    
    // Update only allowed fields
    const { name, email, avatar } = req.body;
    
    if (name) user.name = name;
    if (email) user.email = email;
    if (avatar) user.avatar = avatar;
    
    await user.save();
    
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, error: 'Server error updating profile' });
  }
};

// @desc    Change password
// @route   PUT /api/auth/password
// @access  Private
const changePassword = async (req, res) => {
  try {
    const user = req.user;
    
    if (!user) {
      res.status(401).json({ success: false, error: 'Not authorized' });
      return;
    }
    
    const { currentPassword, newPassword } = req.body;
    
    // Verify current password
    const userWithPassword = await User.findById(user._id).select('+password');
    if (!userWithPassword) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    
    const isMatch = await userWithPassword.comparePassword(currentPassword);
    if (!isMatch) {
      res.status(401).json({ success: false, error: 'Current password is incorrect' });
      return;
    }
    
    // Update password
    userWithPassword.password = newPassword;
    await userWithPassword.save();
    
    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ success: false, error: 'Server error changing password' });
  }
};

// Social Authentication Routes
const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email']
});

const googleCallback = (req, res) => {
  passport.authenticate('google', { session: false }, (err, profile) => {
    if (err || !profile) {
      return res.status(401).json({ success: false, error: 'Google authentication failed' });
    }
    handleSocialAuthResponse(req, res, profile);
  })(req, res);
};

const facebookAuth = passport.authenticate('facebook', {
  scope: ['email']
});

const facebookCallback = (req, res) => {
  passport.authenticate('facebook', { session: false }, (err, profile) => {
    if (err || !profile) {
      return res.status(401).json({ success: false, error: 'Facebook authentication failed' });
    }
    handleSocialAuthResponse(req, res, profile);
  })(req, res);
};

const twitterAuth = passport.authenticate('twitter');

const twitterCallback = (req, res) => {
  passport.authenticate('twitter', { session: false }, (err, profile) => {
    if (err || !profile) {
      return res.status(401).json({ success: false, error: 'Twitter authentication failed' });
    }
    handleSocialAuthResponse(req, res, profile);
  })(req, res);
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  googleAuth,
  googleCallback,
  facebookAuth,
  facebookCallback,
  twitterAuth,
  twitterCallback
};