"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const http_status_codes_1 = require("http-status-codes");
class AnalyticsController {
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
        this.metrics = async (_req, res) => {
            res.status(http_status_codes_1.StatusCodes.OK).json(this.analyticsService.getMetrics());
        };
        this.ingest = async (req, res) => {
            const { event, userId, data } = req.body;
            const entry = this.analyticsService.recordEvent(event, { userId, data });
            res.status(http_status_codes_1.StatusCodes.CREATED).json(entry);
        };
    }
}
exports.AnalyticsController = AnalyticsController;
//# sourceMappingURL=AnalyticsController.js.map