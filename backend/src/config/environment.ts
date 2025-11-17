import dotenv from 'dotenv';
import type { StringValue } from 'ms';

dotenv.config();

const getEnv = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const env = {
  nodeEnv: getEnv('NODE_ENV', 'development'),
  port: Number(getEnv('PORT', '4000')),
  jwtSecret: getEnv('JWT_SECRET', 'super-secret-key'),
  jwtExpiresIn: getEnv('JWT_EXPIRES_IN', '15m') as StringValue,
  refreshSecret: getEnv('REFRESH_SECRET', 'super-refresh-key'),
  refreshExpiresIn: getEnv('REFRESH_EXPIRES_IN', '7d') as StringValue,
  cdnBaseUrl: getEnv('CDN_BASE_URL', 'https://cdn.fflix.local'),
};

