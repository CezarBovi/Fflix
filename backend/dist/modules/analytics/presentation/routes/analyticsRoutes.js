"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsRoutes = void 0;
const express_1 = require("express");
const AnalyticsService_1 = require("../../application/services/AnalyticsService");
const AnalyticsController_1 = require("../controllers/AnalyticsController");
const safeHandler_1 = require("../../../../shared/utils/safeHandler");
const analyticsService = new AnalyticsService_1.AnalyticsService();
const controller = new AnalyticsController_1.AnalyticsController(analyticsService);
exports.analyticsRoutes = (0, express_1.Router)();
exports.analyticsRoutes.get('/metrics', (0, safeHandler_1.safeHandler)(controller.metrics));
exports.analyticsRoutes.post('/events', (0, safeHandler_1.safeHandler)(controller.ingest));
//# sourceMappingURL=analyticsRoutes.js.map