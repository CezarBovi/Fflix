"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranscodingService = void 0;
const crypto_1 = require("crypto");
class TranscodingService {
    constructor() {
        this.jobs = new Map();
    }
    enqueueJob(sourceJobId, renditions) {
        const job = {
            id: (0, crypto_1.randomUUID)(),
            sourceJobId,
            status: 'queued',
            renditions,
        };
        this.jobs.set(job.id, job);
        return job;
    }
    getJob(jobId) {
        return this.jobs.get(jobId);
    }
}
exports.TranscodingService = TranscodingService;
//# sourceMappingURL=TranscodingService.js.map