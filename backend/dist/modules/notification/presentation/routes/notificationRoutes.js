"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRoutes = void 0;
const express_1 = require("express");
const NotificationService_1 = require("../../application/services/NotificationService");
const NotificationController_1 = require("../controllers/NotificationController");
const authMiddleware_1 = require("../../../auth/infrastructure/middlewares/authMiddleware");
const safeHandler_1 = require("../../../../shared/utils/safeHandler");
const notificationService = new NotificationService_1.NotificationService();
const controller = new NotificationController_1.NotificationController(notificationService);
exports.notificationRoutes = (0, express_1.Router)();
exports.notificationRoutes.post('/email', authMiddleware_1.authMiddleware, (0, safeHandler_1.safeHandler)(controller.sendEmail));
exports.notificationRoutes.post('/push', authMiddleware_1.authMiddleware, (0, safeHandler_1.safeHandler)(controller.sendPush));
//# sourceMappingURL=notificationRoutes.js.map