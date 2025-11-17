"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const InMemoryUserRepository_1 = require("../modules/auth/infrastructure/repositories/InMemoryUserRepository");
const JWTService_1 = require("../modules/auth/infrastructure/services/JWTService");
const userRepository = new InMemoryUserRepository_1.InMemoryUserRepository();
const tokenService = new JWTService_1.JWTService();
exports.container = {
    userRepository,
    tokenService,
};
//# sourceMappingURL=container.js.map