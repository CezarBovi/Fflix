"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const UserService_1 = require("../../application/services/UserService");
const container_1 = require("../../../../shared/container");
const UserController_1 = require("../controllers/UserController");
const authMiddleware_1 = require("../../../auth/infrastructure/middlewares/authMiddleware");
const safeHandler_1 = require("../../../../shared/utils/safeHandler");
const userService = new UserService_1.UserService(container_1.container.userRepository);
const controller = new UserController_1.UserController(userService);
exports.userRoutes = (0, express_1.Router)();
exports.userRoutes.get('/me', authMiddleware_1.authMiddleware, (0, safeHandler_1.safeHandler)(controller.me));
exports.userRoutes.patch('/me/preferences', authMiddleware_1.authMiddleware, (0, safeHandler_1.safeHandler)(controller.updatePreferences));
exports.userRoutes.get('/:id/history', authMiddleware_1.authMiddleware, (0, safeHandler_1.safeHandler)(controller.history));
//# sourceMappingURL=userRoutes.js.map