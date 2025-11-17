"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingController = void 0;
const http_status_codes_1 = require("http-status-codes");
class StreamingController {
    constructor(streamingService) {
        this.streamingService = streamingService;
        this.playback = async (req, res) => {
            const userId = req.user?.sub;
            if (!userId) {
                res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'Usuário não autenticado' });
                return;
            }
            const session = this.streamingService.startSession(req.params.videoId, userId);
            res.status(http_status_codes_1.StatusCodes.OK).json(session);
        };
        this.heartbeat = async (req, res) => {
            const session = this.streamingService.heartbeat(req.params.sessionId);
            res.status(http_status_codes_1.StatusCodes.OK).json(session);
        };
    }
}
exports.StreamingController = StreamingController;
//# sourceMappingURL=StreamingController.js.map