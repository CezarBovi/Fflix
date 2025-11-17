"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserUseCase = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Email_1 = require("../../domain/value-objects/Email");
const ValidationError_1 = require("../../../../shared/domain/errors/ValidationError");
class LoginUserUseCase {
    constructor(userRepository, tokenService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }
    async execute(dto) {
        const email = Email_1.Email.create(dto.email).value;
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new ValidationError_1.ValidationError('Credenciais inválidas');
        }
        const isValidPassword = await bcryptjs_1.default.compare(dto.password, user.passwordHash);
        if (!isValidPassword) {
            throw new ValidationError_1.ValidationError('Credenciais inválidas');
        }
        const tokens = this.tokenService.generateTokens({
            sub: user.id,
            roles: user.roles,
        });
        return {
            ...tokens,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                roles: user.roles,
            },
        };
    }
}
exports.LoginUserUseCase = LoginUserUseCase;
//# sourceMappingURL=LoginUser.js.map