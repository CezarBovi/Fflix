"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentController = void 0;
const http_status_codes_1 = require("http-status-codes");
const contentValidators_1 = require("../validators/contentValidators");
class ContentController {
    constructor(contentService) {
        this.contentService = contentService;
        this.create = async (req, res) => {
            const payload = contentValidators_1.createVideoSchema.parse(req.body);
            const video = this.contentService.createVideo(payload);
            res.status(http_status_codes_1.StatusCodes.CREATED).json(video);
        };
        this.list = async (req, res) => {
            const videos = this.contentService.listVideos(req.query.q);
            res.status(http_status_codes_1.StatusCodes.OK).json(videos);
        };
        this.show = async (req, res) => {
            const video = this.contentService.getVideoById(req.params.id);
            res.status(http_status_codes_1.StatusCodes.OK).json(video);
        };
        this.publish = async (req, res) => {
            const video = this.contentService.publishVideo(req.params.id);
            res.status(http_status_codes_1.StatusCodes.OK).json(video);
        };
    }
}
exports.ContentController = ContentController;
//# sourceMappingURL=ContentController.js.map