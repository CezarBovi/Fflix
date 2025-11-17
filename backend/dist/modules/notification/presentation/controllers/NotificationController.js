"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const http_status_codes_1 = require("http-status-codes");
class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
        this.sendEmail = async (req, res) => {
            const { to, subject, body } = req.body;
            const result = this.notificationService.sendEmail(to, subject, body);
            res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(result);
        };
        this.sendPush = async (req, res) => {
            const { token, message } = req.body;
            const result = this.notificationService.sendPush(token, message);
            res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(result);
        };
    }
}
exports.NotificationController = NotificationController;
//# sourceMappingURL=NotificationController.js.map