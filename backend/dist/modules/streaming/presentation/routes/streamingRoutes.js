"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamingRoutes = void 0;
const express_1 = require("express");
const StreamingService_1 = require("../../application/services/StreamingService");
const StreamingController_1 = require("../controllers/StreamingController");
const authMiddleware_1 = require("../../../auth/infrastructure/middlewares/authMiddleware");
const safeHandler_1 = require("../../../../shared/utils/safeHandler");
const streamingService = new StreamingService_1.StreamingService();
const controller = new StreamingController_1.StreamingController(streamingService);
exports.streamingRoutes = (0, express_1.Router)();
exports.streamingRoutes.get('/playback/:videoId', authMiddleware_1.authMiddleware, (0, safeHandler_1.safeHandler)(controller.playback));
exports.streamingRoutes.post('/sessions/:sessionId/heartbeat', (0, safeHandler_1.safeHandler)(controller.heartbeat));
//# sourceMappingURL=streamingRoutes.js.map