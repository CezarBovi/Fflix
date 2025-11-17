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
};
//# sourceMappingURL=environment.js.map