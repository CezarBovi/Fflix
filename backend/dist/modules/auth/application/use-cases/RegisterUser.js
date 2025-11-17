"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserUseCase = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Email_1 = require("../../domain/value-objects/Email");
const User_1 = require("../../domain/entities/User");
const ValidationError_1 = require("../../../../shared/domain/errors/ValidationError");
class RegisterUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(dto) {
        const email = Email_1.Email.create(dto.email).value;
        const existing = await this.userRepository.findByEmail(email);
        if (existing) {
            throw new ValidationError_1.ValidationError('Usuário já existe');
        }
        const passwordHash = await bcryptjs_1.default.hash(dto.password, 10);
        const user = User_1.User.create({
            email,
            name: dto.name,
            passwordHash,
            roles: ['viewer'],
            preferences: {},
            history: [],
        });
        return this.userRepository.create(user);
    }
}
exports.RegisterUserUseCase = RegisterUserUseCase;
//# sourceMappingURL=RegisterUser.js.map