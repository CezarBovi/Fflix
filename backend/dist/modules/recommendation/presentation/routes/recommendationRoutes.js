"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommendationRoutes = void 0;
const express_1 = require("express");
const RecommendationService_1 = require("../../application/services/RecommendationService");
const RecommendationController_1 = require("../controllers/RecommendationController");
const authMiddleware_1 = require("../../../auth/infrastructure/middlewares/authMiddleware");
const safeHandler_1 = require("../../../../shared/utils/safeHandler");
const recommendationService = new RecommendationService_1.RecommendationService();
const controller = new RecommendationController_1.RecommendationController(recommendationService);
exports.recommendationRoutes = (0, express_1.Router)();
exports.recommendationRoutes.get('/:userId?', authMiddleware_1.authMiddleware, (0, safeHandler_1.safeHandler)(controller.list));
exports.recommendationRoutes.post('/feedback', authMiddleware_1.authMiddleware, (0, safeHandler_1.safeHandler)(controller.feedback));
//# sourceMappingURL=recommendationRoutes.js.map