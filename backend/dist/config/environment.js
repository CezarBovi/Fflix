"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getEnv = (key, fallback) => {
    const value = process.env[key] ?? fallback;
    if (value === undefined) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
};
exports.env = {
    nodeEnv: getEnv('NODE_ENV', 'development'),
    port: Number(getEnv('PORT', '4000')),
    jwtSecret: getEnv('JWT_SECRET', 'super-secret-key'),
    jwtExpiresIn: getEnv('JWT_EXPIRES_IN', '15m'),
    refreshSecret: getEnv('REFRESH_SECRET', 'super-refresh-key'),
    refreshExpiresIn: getEnv('REFRESH_EXPIRES_IN', '7d'),
    cdnBaseUrl: getEnv('CDN_BASE_URL', 'https://cdn.fflix.local'),
    tmdb: {
        apiKey: getEnv('TMDB_API_KEY', ''),
        baseUrl: getEnv('TMDB_BASE_URL', 'https://api.themoviedb.org/3'),
    },
    superEmbed: {
        baseUrl: getEnv('SUPEREMBED_BASE_URL', 'https://multiembed.mov'),
    },
    openSubtitles: {
        apiKey: getEnv('OPENSUBTITLES_API_KEY', ''),
        username: getEnv('OPENSUBTITLES_USERNAME', 'fflix-demo'),
        userAgent: getEnv('OPENSUBTITLES_USER_AGENT', 'FFlix/1.0'),
    },
    redis: {
        host: getEnv('REDIS_HOST', 'localhost'),
        port: Number(getEnv('REDIS_PORT', '6379')),
        password: getEnv('REDIS_PASSWORD', ''),
        enabled: getEnv('REDIS_ENABLED', 'false') === 'true',
        username: getEnv('REDIS_USERNAME', 'default'),
        tlsEnabled: getEnv('REDIS_TLS_ENABLED', 'false') === 'true',
        tlsRejectUnauthorized: getEnv('REDIS_TLS_REJECT_UNAUTHORIZED', 'true') === 'true',
    },
};
//# sourceMappingURL=environment.js.map