"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const http_status_codes_1 = require("http-status-codes");
const uploadValidators_1 = require("../validators/uploadValidators");
class UploadController {
    constructor(uploadService) {
        this.uploadService = uploadService;
        this.signedUrl = async (req, res) => {
            const payload = uploadValidators_1.signedUrlSchema.parse(req.body);
            const response = this.uploadService.requestSignedUrl(payload.fileName, payload.mimeType);
            res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
        };
        this.callback = async (req, res) => {
            const payload = uploadValidators_1.callbackSchema.parse(req.body);
            const job = this.uploadService.completeJob(payload.jobId);
            res.status(http_status_codes_1.StatusCodes.OK).json(job);
        };
    }
}
exports.UploadController = UploadController;
//# sourceMappingURL=UploadController.js.map