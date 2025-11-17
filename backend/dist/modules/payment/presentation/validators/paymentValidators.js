"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookSchema = exports.createSubscriptionSchema = void 0;
const zod_1 = require("zod");
exports.createSubscriptionSchema = zod_1.z.object({
    plan: zod_1.z.enum(['basic', 'standard', 'premium']),
});
exports.webhookSchema = zod_1.z.object({
    event: zod_1.z.string(),
    data: zod_1.z.record(zod_1.z.string(), zod_1.z.any()),
});
//# sourceMappingURL=paymentValidators.js.map