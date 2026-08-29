import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes.js';
import exerciseRoutes from './routes/exercise.routes.js';
import programRoutes from './routes/program.routes.js';
import workoutRoutes from './routes/workout.routes.js';
import coachRoutes from './routes/coach.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import messageRoutes from './routes/message.routes.js';
import subscriptionRoutes from './routes/subscription.routes.js';
import aiRoutes from './routes/ai.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app: Application = express();

// Security & Logging Middleware (Phase 3I & 4J)
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoints (Phase 5A)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'Kinetic Obsidian Fitness Platform REST Server',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/health/live', (req, res) => {
  res.status(200).json({ status: 'ALIVE', uptime: process.uptime() });
});

app.get('/health/ready', (req, res) => {
  const dbReady = mongoose.connection.readyState === 1;
  res.status(200).json({
    status: 'READY',
    database: dbReady ? 'CONNECTED' : 'MOCK_FALLBACK_MODE',
    environment: process.env.NODE_ENV || 'development'
  });
});

// API v1 Base Routers
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/exercises', exerciseRoutes);
app.use('/api/v1/programs', programRoutes);
app.use('/api/v1/workouts', workoutRoutes);
app.use('/api/v1/coach', coachRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/subscriptions', subscriptionRoutes);
app.use('/api/v1/ai', aiRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
