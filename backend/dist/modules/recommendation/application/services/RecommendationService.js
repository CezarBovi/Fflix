"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationService = void 0;
const InMemoryDatabase_1 = require("../../../../shared/infrastructure/persistence/InMemoryDatabase");
class RecommendationService {
    constructor() {
        this.db = InMemoryDatabase_1.InMemoryDatabase.getInstance();
    }
    getRecommendations(userId) {
        const watchedCategories = new Set(Array.from(this.db.videos.values())
            .filter((video) => video.status === 'published')
            .flatMap((video) => video.categories));
        return Array.from(this.db.videos.values()).filter((video) => video.categories.some((category) => watchedCategories.has(category)));
    }
    submitFeedback(userId, videoId, score) {
        return { userId, videoId, score, receivedAt: new Date().toISOString() };
    }
}
exports.RecommendationService = RecommendationService;
//# sourceMappingURL=RecommendationService.js.map