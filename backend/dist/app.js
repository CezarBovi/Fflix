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
const zod_1 = require("zod");
const routes_1 = require("./routes");
const logger_1 = require("./shared/utils/logger");
const http_status_codes_2 = require("http-status-codes");
const ValidationError_1 = require("./shared/domain/errors/ValidationError");
const NotFoundError_1 = require("./shared/domain/errors/NotFoundError");
const UnauthorizedError_1 = require("./shared/domain/errors/UnauthorizedError");
const ConflictError_1 = require("./shared/domain/errors/ConflictError");
const HttpClientError_1 = require("./shared/infrastructure/http/HttpClientError");
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
        // Erros de validação do Zod
        if (err instanceof zod_1.ZodError) {
            const errors = err.issues.map((e) => ({
                path: e.path.join('.'),
                message: e.message,
            }));
            res.status(http_status_codes_2.StatusCodes.BAD_REQUEST).json({
                message: 'Erro de validação',
                errors,
            });
            return;
        }
        // Erros de domínio
        if (err instanceof ValidationError_1.ValidationError) {
            res.status(http_status_codes_2.StatusCodes.BAD_REQUEST).json({ message: err.message });
            return;
        }
        if (err instanceof NotFoundError_1.NotFoundError) {
            res.status(http_status_codes_2.StatusCodes.NOT_FOUND).json({ message: err.message });
            return;
        }
        if (err instanceof UnauthorizedError_1.UnauthorizedError) {
            res.status(http_status_codes_2.StatusCodes.UNAUTHORIZED).json({ message: err.message });
            return;
        }
        if (err instanceof ConflictError_1.ConflictError) {
            res.status(http_status_codes_2.StatusCodes.CONFLICT).json({ message: err.message });
            return;
        }
        // Erros de HTTP client
        if (err instanceof HttpClientError_1.HttpClientError) {
            const status = err.status ?? http_status_codes_2.StatusCodes.BAD_GATEWAY;
            const responseBody = {
                message: err.message,
            };
            if (err.cause && typeof err.cause === 'object') {
                responseBody.cause = err.cause;
            }
            res.status(status).json(responseBody);
            return;
        }
        // Erro genérico - não expor detalhes em produção
        const isDevelopment = process.env.NODE_ENV === 'development';
        res.status(http_status_codes_2.StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: isDevelopment ? err.message : 'Erro interno do servidor',
            ...(isDevelopment && { stack: err.stack }),
        });
    });
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map