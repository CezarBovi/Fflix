"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = require("express");
const PaymentService_1 = require("../../application/services/PaymentService");
const PaymentController_1 = require("../controllers/PaymentController");
const authMiddleware_1 = require("../../../auth/infrastructure/middlewares/authMiddleware");
const safeHandler_1 = require("../../../../shared/utils/safeHandler");
const paymentService = new PaymentService_1.PaymentService();
const controller = new PaymentController_1.PaymentController(paymentService);
exports.paymentRoutes = (0, express_1.Router)();
exports.paymentRoutes.post('/subscriptions', authMiddleware_1.authMiddleware, (0, safeHandler_1.safeHandler)(controller.createSubscription));
exports.paymentRoutes.get('/subscriptions/:id', authMiddleware_1.authMiddleware, (0, safeHandler_1.safeHandler)(controller.getSubscription));
exports.paymentRoutes.post('/webhooks', (0, safeHandler_1.safeHandler)(controller.webhook));
//# sourceMappingURL=paymentRoutes.js.map