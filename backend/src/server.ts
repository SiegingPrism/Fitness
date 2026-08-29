import app from './app.js';
import { connectDatabase } from './config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`🚀 [Kinetic Obsidian Backend] Server listening on http://localhost:${PORT}`);
    console.log(`📌 Health check available at http://localhost:${PORT}/health`);
  });
};

startServer();
