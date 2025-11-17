"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const RegisterUser_1 = require("../../application/use-cases/RegisterUser");
const LoginUser_1 = require("../../application/use-cases/LoginUser");
const RefreshToken_1 = require("../../application/use-cases/RefreshToken");
const AuthController_1 = require("../controllers/AuthController");
const safeHandler_1 = require("../../../../shared/utils/safeHandler");
const container_1 = require("../../../../shared/container");
const registerUser = new RegisterUser_1.RegisterUserUseCase(container_1.container.userRepository);
const loginUser = new LoginUser_1.LoginUserUseCase(container_1.container.userRepository, container_1.container.tokenService);
const refreshToken = new RefreshToken_1.RefreshTokenUseCase(container_1.container.userRepository, container_1.container.tokenService);
const controller = new AuthController_1.AuthController(registerUser, loginUser, refreshToken);
exports.authRoutes = (0, express_1.Router)();
exports.authRoutes.post('/register', (0, safeHandler_1.safeHandler)(controller.register));
exports.authRoutes.post('/login', (0, safeHandler_1.safeHandler)(controller.login));
exports.authRoutes.post('/refresh', (0, safeHandler_1.safeHandler)(controller.refresh));
//# sourceMappingURL=authRoutes.js.map