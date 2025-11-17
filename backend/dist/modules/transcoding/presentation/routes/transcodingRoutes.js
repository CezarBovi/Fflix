"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transcodingRoutes = void 0;
const express_1 = require("express");
const TranscodingService_1 = require("../../application/services/TranscodingService");
const TranscodingController_1 = require("../controllers/TranscodingController");
const authMiddleware_1 = require("../../../auth/infrastructure/middlewares/authMiddleware");
const safeHandler_1 = require("../../../../shared/utils/safeHandler");
const transcodingService = new TranscodingService_1.TranscodingService();
const controller = new TranscodingController_1.TranscodingController(transcodingService);
exports.transcodingRoutes = (0, express_1.Router)();
exports.transcodingRoutes.post('/jobs', authMiddleware_1.authMiddleware, (0, safeHandler_1.safeHandler)(controller.enqueue));
exports.transcodingRoutes.get('/jobs/:id', authMiddleware_1.authMiddleware, (0, safeHandler_1.safeHandler)(controller.status));
//# sourceMappingURL=transcodingRoutes.js.map