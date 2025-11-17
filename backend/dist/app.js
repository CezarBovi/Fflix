"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const http_status_codes_1 = require("http-status-codes");
const routes_1 = require("./routes");
const logger_1 = require("./shared/utils/logger");
const createApp = () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use(express_1.default.json({ limit: '10mb' }));
    app.get('/health', (_req, res) => {
        res.status(http_status_codes_1.StatusCodes.OK).json({ status: 'ok', timestamp: new Date().toISOString() });
    });
    app.use('/api', routes_1.apiRouter);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((err, _req, res, _next) => {
        logger_1.logger.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
    });
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map