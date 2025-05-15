import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User';
import { AuthRequest, RegisterUser, LoginUser } from '../types/auth.types';
import mongoose from 'mongoose';

// Helper function to generate JWT
const generateToken = (id: mongoose.Types.ObjectId): string => {
  const secret = process.env.JWT_SECRET || 'fallback_secret';
  // @ts-ignore - Ignoring TypeScript error for jwt.sign
  return jwt.sign({ id: id.toString() }, secret, {
    expiresIn: process.env.JWT_EXPIRATION || '7d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
      return;
    }

    const { name, email, password }: RegisterUser = req.body;

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
    });

    // Generate JWT using properly typed ObjectId
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, error: 'Server error during registration' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
      return;
    }

    const { email, password }: LoginUser = req.body;

    // Find user by email and include the password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    // Generate JWT using properly typed ObjectId
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Server error during login' });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
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
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ success: false, error: 'Server error getting user profile' });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
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
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, error: 'Server error updating profile' });
  }
};

// @desc    Change password
// @route   PUT /api/auth/password
// @access  Private
export const changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
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
      message: 'Password updated successfully',
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ success: false, error: 'Server error changing password' });
  }
};