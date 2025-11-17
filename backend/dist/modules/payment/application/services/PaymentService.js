"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const InMemoryDatabase_1 = require("../../../../shared/infrastructure/persistence/InMemoryDatabase");
const crypto_1 = require("crypto");
const ValidationError_1 = require("../../../../shared/domain/errors/ValidationError");
class PaymentService {
    constructor() {
        this.db = InMemoryDatabase_1.InMemoryDatabase.getInstance();
    }
    createSubscription(userId, plan) {
        const subscriptionId = (0, crypto_1.randomUUID)();
        const record = {
            id: subscriptionId,
            userId,
            plan,
            status: 'active',
            renewsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        };
        this.db.subscriptions.set(subscriptionId, record);
        return record;
    }
    getSubscription(subscriptionId) {
        const subscription = this.db.subscriptions.get(subscriptionId);
        if (!subscription) {
            throw new ValidationError_1.ValidationError('Assinatura não encontrada');
        }
        return subscription;
    }
    handleWebhook(payload) {
        return { received: true, payload };
    }
}
exports.PaymentService = PaymentService;
//# sourceMappingURL=PaymentService.js.map