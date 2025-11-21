"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryDatabase = void 0;
const crypto_1 = require("crypto");
const bcryptjs_1 = require("bcryptjs");
class InMemoryDatabase {
    constructor() {
        this.users = new Map();
        this.videos = new Map();
        this.subscriptions = new Map();
        this.watchProgress = new Map(); // key: `${userId}:${movieId}`
        this.seed();
    }
    static getInstance() {
        if (!InMemoryDatabase.instance) {
            InMemoryDatabase.instance = new InMemoryDatabase();
        }
        return InMemoryDatabase.instance;
    }
    seed() {
        const userId = (0, crypto_1.randomUUID)();
        const videoId = (0, crypto_1.randomUUID)();
        const subscriptionId = (0, crypto_1.randomUUID)();
        this.users.set(userId, {
            id: userId,
            email: 'demo@fflix.io',
            passwordHash: (0, bcryptjs_1.hashSync)('Sup3rSecret!', 10),
            name: 'Demo User',
            roles: ['viewer'],
            preferences: { language: 'pt-BR', theme: 'dark' },
            history: [
                { videoId, watchedAt: new Date(), progress: 0.8 },
                { videoId: (0, crypto_1.randomUUID)(), watchedAt: new Date(), progress: 0.5 },
            ],
        });
        this.videos.set(videoId, {
            id: videoId,
            title: 'Introducing FFlix',
            description: 'Visão geral da plataforma FFlix.',
            categories: ['Tech', 'Demo'],
            status: 'published',
            duration: 600,
            formats: ['mp4', 'hls'],
        });
        this.subscriptions.set(subscriptionId, {
            id: subscriptionId,
            userId,
            plan: 'premium',
            status: 'active',
            renewsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });
    }
}
exports.InMemoryDatabase = InMemoryDatabase;
//# sourceMappingURL=InMemoryDatabase.js.map