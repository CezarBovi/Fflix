"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const crypto_1 = require("crypto");
class UploadService {
    constructor() {
        this.jobs = new Map();
    }
    requestSignedUrl(fileName, mimeType) {
        const jobId = (0, crypto_1.randomUUID)();
        const uploadUrl = `https://storage.fflix.local/upload/${jobId}`;
        const job = { id: jobId, fileName, status: 'pending' };
        this.jobs.set(jobId, job);
        return { jobId, uploadUrl, fields: { 'Content-Type': mimeType } };
    }
    completeJob(jobId) {
        const job = this.jobs.get(jobId);
        if (!job) {
            throw new Error('Job não encontrado');
        }
        job.status = 'completed';
        return job;
    }
    getJob(jobId) {
        return this.jobs.get(jobId);
    }
}
exports.UploadService = UploadService;
//# sourceMappingURL=UploadService.js.map