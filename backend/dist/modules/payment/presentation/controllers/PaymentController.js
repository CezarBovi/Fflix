"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const http_status_codes_1 = require("http-status-codes");
const paymentValidators_1 = require("../validators/paymentValidators");
class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
        this.createSubscription = async (req, res) => {
            const userId = req.user?.sub;
            if (!userId) {
                res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'Usuário não autenticado' });
                return;
            }
            const payload = paymentValidators_1.createSubscriptionSchema.parse(req.body);
            const subscription = this.paymentService.createSubscription(userId, payload.plan);
            res.status(http_status_codes_1.StatusCodes.CREATED).json(subscription);
        };
        this.getSubscription = async (req, res) => {
            const subscription = this.paymentService.getSubscription(req.params.id);
            res.status(http_status_codes_1.StatusCodes.OK).json(subscription);
        };
        this.webhook = async (req, res) => {
            const payload = paymentValidators_1.webhookSchema.parse(req.body);
            const result = this.paymentService.handleWebhook(payload);
            res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(result);
        };
    }
}
exports.PaymentController = PaymentController;
//# sourceMappingURL=PaymentController.js.map