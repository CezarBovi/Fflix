"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const logger_1 = require("../../../../shared/utils/logger");
class NotificationService {
    sendEmail(to, subject, body) {
        logger_1.logger.info({ to, subject }, 'Email enfileirado');
        return { to, subject, body, status: 'queued' };
    }
    sendPush(token, message) {
        logger_1.logger.info({ token }, 'Push enfileirado');
        return { token, message, status: 'queued' };
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=NotificationService.js.map