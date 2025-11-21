"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const NotFoundError_1 = require("../../../../shared/domain/errors/NotFoundError");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getProfile(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError_1.NotFoundError('Usuário', userId);
        }
        return user.toSafeJSON();
    }
    async updatePreferences(userId, preferences) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError_1.NotFoundError('Usuário', userId);
        }
        const updated = await this.userRepository.update(user.withPreferences(preferences));
        return updated.toSafeJSON();
    }
    async getHistory(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError_1.NotFoundError('Usuário', userId);
        }
        return user.history;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map