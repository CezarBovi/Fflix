"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
class AnalyticsService {
    constructor() {
        this.events = [];
    }
    recordEvent(event, payload) {
        const entry = {
            event,
            userId: payload.userId,
            data: payload.data ?? {},
            occurredAt: new Date().toISOString(),
        };
        this.events.push(entry);
        return entry;
    }
    getMetrics() {
        return {
            totalEvents: this.events.length,
            byEvent: this.events.reduce((acc, current) => {
                acc[current.event] = (acc[current.event] ?? 0) + 1;
                return acc;
            }, {}),
            recent: this.events.slice(-10),
        };
    }
}
exports.AnalyticsService = AnalyticsService;
//# sourceMappingURL=AnalyticsService.js.map