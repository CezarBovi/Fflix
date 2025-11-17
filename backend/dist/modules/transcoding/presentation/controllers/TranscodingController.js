"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranscodingController = void 0;
const http_status_codes_1 = require("http-status-codes");
class TranscodingController {
    constructor(transcodingService) {
        this.transcodingService = transcodingService;
        this.enqueue = async (req, res) => {
            const { uploadJobId, renditions = ['240p', '480p', '1080p'] } = req.body;
            const job = this.transcodingService.enqueueJob(uploadJobId, renditions);
            res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(job);
        };
        this.status = async (req, res) => {
            const job = this.transcodingService.getJob(req.params.id);
            if (!job) {
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: 'Job não encontrado' });
                return;
            }
            res.status(http_status_codes_1.StatusCodes.OK).json(job);
        };
    }
}
exports.TranscodingController = TranscodingController;
//# sourceMappingURL=TranscodingController.js.map