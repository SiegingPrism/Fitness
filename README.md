# Fitness Platform (Android & Web)

This repository contains the complete **Kinetic Obsidian** Fitness application platform (Coach + Athlete + AI training + Monetization & Exercise Library 2.0) configured for Android mobile development and web deployment.

## Project Structure

```
Fitness/
├── frontend/             # React + TypeScript + Vite Web & Native Mobile App
│   ├── android/          # Native Android Studio project (Gradle + Capacitor wrapper)
│   ├── src/              # React UI components (Athlete, Coach, AI Trainer, Paywall & Exercise Detail)
│   ├── capacitor.config.ts # Capacitor cross-platform configuration
│   └── package.json      # Frontend dependencies and mobile build scripts
├── backend/              # Node.js + Express + TypeScript backend REST API
│   ├── src/models/       # Mongoose schemas (Exercise, Subscription, AIUsage, WorkoutSession, User)
│   ├── src/controllers/  # REST API handlers
│   └── src/routes/       # API routers (/api/v1/exercises, /subscriptions, /workouts, /ai, /coach)
├── Phase1.txt            # Product & System Architecture specs
├── Phase2.txt            # UI/UX Architecture specs
├── Phase3.txt            # Backend REST API & DB specs
├── Phase4.txt            # Client Architecture & State specs
├── Phase5.txt            # Monetization, Subscriptions & Quotas specs
└── Phase6.txt            # Exercise Library 2.0 & Product Refinement specs
```

## Quick Start & Running Locally

### 1. Backend REST Server
```bash
cd backend
npm install
npm run build
npm start
# Server listens on http://localhost:5001 (Health check: http://localhost:5001/health/ready)
```

### 2. Frontend React Web App
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

### 3. Android Mobile Workflow
```bash
cd frontend
npm run cap:build # Builds Vite bundle and syncs to Android project
npm run cap:open  # Opens frontend/android in Android Studio
```
