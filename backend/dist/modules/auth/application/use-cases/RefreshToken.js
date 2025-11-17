"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenUseCase = void 0;
const ValidationError_1 = require("../../../../shared/domain/errors/ValidationError");
class RefreshTokenUseCase {
    constructor(userRepository, tokenService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }
    async execute(dto) {
        const payload = this.tokenService.verifyRefreshToken(dto.refreshToken);
        const userId = payload.sub;
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new ValidationError_1.ValidationError('Usuário não encontrado');
        }
        return this.tokenService.generateTokens({ sub: user.id, roles: user.roles });
    }
}
exports.RefreshTokenUseCase = RefreshTokenUseCase;
//# sourceMappingURL=RefreshToken.js.map