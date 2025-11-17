"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVideoSchema = void 0;
const zod_1 = require("zod");
exports.createVideoSchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    description: zod_1.z.string().min(10),
    categories: zod_1.z.array(zod_1.z.string()).default([]),
    duration: zod_1.z.number().positive(),
    formats: zod_1.z.array(zod_1.z.string()).default(['mp4']),
});
//# sourceMappingURL=contentValidators.js.map