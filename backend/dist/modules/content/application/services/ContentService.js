"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentService = void 0;
const InMemoryDatabase_1 = require("../../../../shared/infrastructure/persistence/InMemoryDatabase");
const VideoAsset_1 = require("../../domain/entities/VideoAsset");
const ValidationError_1 = require("../../../../shared/domain/errors/ValidationError");
class ContentService {
    constructor() {
        this.db = InMemoryDatabase_1.InMemoryDatabase.getInstance();
    }
    createVideo(payload) {
        const video = VideoAsset_1.VideoAsset.create({
            ...payload,
            status: payload.status ?? 'draft',
        });
        const record = {
            id: video.id,
            title: video.title,
            description: payload.description,
            categories: payload.categories,
            status: payload.status ?? 'draft',
            duration: payload.duration,
            formats: payload.formats,
        };
        this.db.videos.set(video.id, record);
        return record;
    }
    listVideos(query) {
        const videos = Array.from(this.db.videos.values());
        if (!query) {
            return videos;
        }
        const normalized = query.toLowerCase();
        return videos.filter((video) => video.title.toLowerCase().includes(normalized) ||
            video.description.toLowerCase().includes(normalized));
    }
    getVideoById(id) {
        const video = this.db.videos.get(id);
        if (!video) {
            throw new ValidationError_1.ValidationError('Vídeo não encontrado');
        }
        return video;
    }
    publishVideo(id) {
        const video = this.db.videos.get(id);
        if (!video) {
            throw new ValidationError_1.ValidationError('Vídeo não encontrado');
        }
        video.status = 'published';
        this.db.videos.set(id, video);
        return video;
    }
}
exports.ContentService = ContentService;
//# sourceMappingURL=ContentService.js.map