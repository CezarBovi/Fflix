"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = require("../../../../config/environment");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: 'Token não fornecido' });
        return;
    }
    const [, token] = authHeader.split(' ');
    try {
        const decoded = jsonwebtoken_1.default.verify(token, environment_1.env.jwtSecret);
        req.user = decoded;
        next();
    }
    catch {
        res.status(401).json({ message: 'Token inválido' });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map