"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callbackSchema = exports.signedUrlSchema = void 0;
const zod_1 = require("zod");
exports.signedUrlSchema = zod_1.z.object({
    fileName: zod_1.z.string().min(3),
    mimeType: zod_1.z.string().min(3),
});
exports.callbackSchema = zod_1.z.object({
    jobId: zod_1.z.string().uuid(),
    status: zod_1.z.enum(['completed', 'failed']).default('completed'),
});
//# sourceMappingURL=uploadValidators.js.map