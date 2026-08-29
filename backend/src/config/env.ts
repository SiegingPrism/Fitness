import dotenv from 'dotenv';

dotenv.config();

const requiredEnv = [
  'MONGODB_URI',
  'JWT_ACCESS_SECRET',
  'JWT_REFRESH_SECRET'
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    console.warn(`[Config Warning] Missing environment variable: ${key}. Using development default.`);
  }
}

export const env = {
  port: Number(process.env.PORT) || 5001,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fitness_db',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'kinetic_obsidian_access_secret_key_2026',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'kinetic_obsidian_refresh_secret_key_2026',
  aiApiKey: process.env.AI_API_KEY || 'mock_ai_key_phase3'
};
