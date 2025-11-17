"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentRoutes = void 0;
const express_1 = require("express");
const ContentService_1 = require("../../application/services/ContentService");
const ContentController_1 = require("../controllers/ContentController");
const safeHandler_1 = require("../../../../shared/utils/safeHandler");
const authMiddleware_1 = require("../../../auth/infrastructure/middlewares/authMiddleware");
const contentService = new ContentService_1.ContentService();
const controller = new ContentController_1.ContentController(contentService);
exports.contentRoutes = (0, express_1.Router)();
exports.contentRoutes.get('/', (0, safeHandler_1.safeHandler)(controller.list));
exports.contentRoutes.get('/:id', (0, safeHandler_1.safeHandler)(controller.show));
exports.contentRoutes.post('/', authMiddleware_1.authMiddleware, (0, safeHandler_1.safeHandler)(controller.create));
exports.contentRoutes.post('/:id/publish', authMiddleware_1.authMiddleware, (0, safeHandler_1.safeHandler)(controller.publish));
//# sourceMappingURL=contentRoutes.js.map