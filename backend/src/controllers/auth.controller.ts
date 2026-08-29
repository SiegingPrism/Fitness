import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, UserRole } from '../models/User.js';
import { AthleteProfile } from '../models/AthleteProfile.js';
import { CoachProfile } from '../models/CoachProfile.js';
import { env } from '../config/env.js';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    if (!email || !password || !firstName || !lastName || !role) {
      res.status(400).json({ success: false, message: 'All fields (email, password, firstName, lastName, role) are required' });
      return;
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(400).json({ success: false, message: 'Email address is already registered' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userRole = role === 'COACH' ? UserRole.COACH : UserRole.ATHLETE;

    const newUser = await User.create({
      email: email.toLowerCase(),
      passwordHash,
      firstName,
      lastName,
      role: userRole
    });

    // Create corresponding profile document
    if (userRole === UserRole.ATHLETE) {
      await AthleteProfile.create({
        userId: newUser._id,
        primaryGoal: 'STRENGTH',
        experienceLevel: 'INTERMEDIATE',
        weeklyWorkoutDays: 4
      });
    } else {
      await CoachProfile.create({
        userId: newUser._id,
        bio: 'Certified Performance & Strength Coach',
        specialties: ['Hypertrophy', 'Powerlifting'],
        certifications: ['CSCS', 'NASM'],
        maxClients: 50,
        inviteCode: `COACH-${Math.floor(1000 + Math.random() * 9000)}`
      });
    }

    const accessToken = jwt.sign(
      { sub: newUser._id.toString(), role: newUser.role, email: newUser.email },
      env.jwtAccessSecret,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { sub: newUser._id.toString() },
      env.jwtRefreshSecret,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        user: {
          id: newUser._id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          role: newUser.role
        },
        accessToken,
        refreshToken
      }
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password are required' });
      return;
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    const accessToken = jwt.sign(
      { sub: user._id.toString(), role: user.role, email: user.email },
      env.jwtAccessSecret,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { sub: user._id.toString() },
      env.jwtRefreshSecret,
      { expiresIn: '30d' }
    );

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        },
        accessToken,
        refreshToken
      }
    });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { refreshToken: token } = req.body;

    if (!token) {
      res.status(400).json({ success: false, message: 'Refresh token is required' });
      return;
    }

    const decoded: any = jwt.verify(token, env.jwtRefreshSecret);
    const user = await User.findById(decoded.sub);

    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid refresh token payload' });
      return;
    }

    const newAccessToken = jwt.sign(
      { sub: user._id.toString(), role: user.role, email: user.email },
      env.jwtAccessSecret,
      { expiresIn: '15m' }
    );

    res.status(200).json({
      success: true,
      data: {
        accessToken: newAccessToken
      }
    });
  } catch (err) {
    res.status(401).json({ success: false, message: 'Refresh token expired or invalid' });
  }
};
