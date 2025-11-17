"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingService = void 0;
const crypto_1 = require("crypto");
const environment_1 = require("../../../../config/environment");
class StreamingService {
    constructor() {
        this.sessions = new Map();
    }
    startSession(videoId, userId) {
        const session = {
            id: (0, crypto_1.randomUUID)(),
            videoId,
            userId,
            manifestUrl: `${environment_1.env.cdnBaseUrl}/videos/${videoId}/index.m3u8`,
            licenseUrl: `${environment_1.env.cdnBaseUrl}/drm/${videoId}`,
            lastHeartbeat: new Date(),
        };
        this.sessions.set(session.id, session);
        return session;
    }
    heartbeat(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session) {
            throw new Error('Sessão não encontrada');
        }
        session.lastHeartbeat = new Date();
        return session;
    }
}
exports.StreamingService = StreamingService;
//# sourceMappingURL=StreamingService.js.map