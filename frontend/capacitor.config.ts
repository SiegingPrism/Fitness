import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fitness.app',
  appName: 'Fitness',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
