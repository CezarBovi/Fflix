"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const ValidationError_1 = require("../../../../shared/domain/errors/ValidationError");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getProfile(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new ValidationError_1.ValidationError('Usuário não encontrado');
        }
        return user.toSafeJSON();
    }
    async updatePreferences(userId, preferences) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new ValidationError_1.ValidationError('Usuário não encontrado');
        }
        const updated = await this.userRepository.update(user.withPreferences(preferences));
        return updated.toSafeJSON();
    }
    async getHistory(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new ValidationError_1.ValidationError('Usuário não encontrado');
        }
        return user.history;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map