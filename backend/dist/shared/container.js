"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const InMemoryUserRepository_1 = require("../modules/auth/infrastructure/repositories/InMemoryUserRepository");
const JWTService_1 = require("../modules/auth/infrastructure/services/JWTService");
const TMDbClient_1 = require("../modules/metadata/infrastructure/http/TMDbClient");
const MovieRepository_1 = require("../modules/metadata/infrastructure/repositories/MovieRepository");
const OpenSubtitlesAdapter_1 = require("../modules/subtitle/infrastructure/adapters/OpenSubtitlesAdapter");
const SubtitleRepository_1 = require("../modules/subtitle/infrastructure/repositories/SubtitleRepository");
const SuperEmbedAdapter_1 = require("../modules/player/infrastructure/adapters/SuperEmbedAdapter");
const PlayerRepository_1 = require("../modules/player/infrastructure/repositories/PlayerRepository");
const CacheProviderFactory_1 = require("./infrastructure/cache/CacheProviderFactory");
// Repositórios
const userRepository = new InMemoryUserRepository_1.InMemoryUserRepository();
const tokenService = new JWTService_1.JWTService();
// Clientes HTTP externos
const tmdbClient = new TMDbClient_1.TMDbClient();
const openSubtitlesAdapter = new OpenSubtitlesAdapter_1.OpenSubtitlesAdapter();
const superEmbedAdapter = new SuperEmbedAdapter_1.SuperEmbedAdapter();
// Cache provider (singleton)
const cacheProvider = (0, CacheProviderFactory_1.getCacheProvider)();
// Repositórios de domínio
const movieRepository = new MovieRepository_1.MovieRepository(tmdbClient);
const subtitleRepository = new SubtitleRepository_1.SubtitleRepository(openSubtitlesAdapter);
const playerRepository = new PlayerRepository_1.PlayerRepository(superEmbedAdapter);
exports.container = {
    // Auth
    userRepository,
    tokenService,
    // Metadata
    movieRepository,
    tmdbClient,
    // Subtitles
    subtitleRepository,
    openSubtitlesAdapter,
    // Player
    playerRepository,
    superEmbedAdapter,
    // Cache
    cacheProvider,
};
//# sourceMappingURL=container.js.map