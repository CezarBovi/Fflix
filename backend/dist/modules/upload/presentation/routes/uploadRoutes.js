"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRoutes = void 0;
const express_1 = require("express");
const UploadService_1 = require("../../application/services/UploadService");
const UploadController_1 = require("../controllers/UploadController");
const authMiddleware_1 = require("../../../auth/infrastructure/middlewares/authMiddleware");
const safeHandler_1 = require("../../../../shared/utils/safeHandler");
const uploadService = new UploadService_1.UploadService();
const controller = new UploadController_1.UploadController(uploadService);
exports.uploadRoutes = (0, express_1.Router)();
exports.uploadRoutes.post('/signed-url', authMiddleware_1.authMiddleware, (0, safeHandler_1.safeHandler)(controller.signedUrl));
exports.uploadRoutes.post('/callback', (0, safeHandler_1.safeHandler)(controller.callback));
//# sourceMappingURL=uploadRoutes.js.map