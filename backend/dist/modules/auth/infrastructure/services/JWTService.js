"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = require("../../../../config/environment");
class JWTService {
    generateTokens(payload) {
        const accessOptions = { expiresIn: environment_1.env.jwtExpiresIn };
        const refreshOptions = { expiresIn: environment_1.env.refreshExpiresIn };
        const accessToken = jsonwebtoken_1.default.sign(payload, environment_1.env.jwtSecret, accessOptions);
        const refreshToken = jsonwebtoken_1.default.sign(payload, environment_1.env.refreshSecret, refreshOptions);
        return { accessToken, refreshToken };
    }
    verifyRefreshToken(token) {
        return jsonwebtoken_1.default.verify(token, environment_1.env.refreshSecret);
    }
}
exports.JWTService = JWTService;
//# sourceMappingURL=JWTService.js.map