"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
const InMemoryDatabase_1 = require("../../../../shared/infrastructure/persistence/InMemoryDatabase");
const User_1 = require("../../domain/entities/User");
const NotFoundError_1 = require("../../../../shared/domain/errors/NotFoundError");
class InMemoryUserRepository {
    constructor() {
        this.db = InMemoryDatabase_1.InMemoryDatabase.getInstance();
    }
    async create(user) {
        this.db.users.set(user.id, {
            id: user.id,
            email: user.email,
            name: user.name,
            passwordHash: user.passwordHash,
            roles: user.roles,
            preferences: user.preferences,
            history: user.history,
        });
        return user;
    }
    async findByEmail(email) {
        const record = Array.from(this.db.users.values()).find((userRecord) => userRecord.email === email);
        return record ? this.mapRecordToEntity(record) : null;
    }
    async findById(id) {
        const record = this.db.users.get(id);
        return record ? this.mapRecordToEntity(record) : null;
    }
    async update(user) {
        const record = this.db.users.get(user.id);
        if (!record) {
            throw new NotFoundError_1.NotFoundError('Usuário', user.id);
        }
        this.db.users.set(user.id, {
            ...record,
            email: user.email,
            name: user.name,
            passwordHash: user.passwordHash,
            roles: user.roles,
            preferences: user.preferences,
            history: user.history,
        });
        return user;
    }
    async list() {
        return Array.from(this.db.users.values()).map((record) => this.mapRecordToEntity(record));
    }
    mapRecordToEntity(record) {
        const props = {
            email: record.email,
            name: record.name,
            passwordHash: record.passwordHash,
            roles: record.roles,
            preferences: record.preferences,
            history: record.history,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        return User_1.User.restore(props, record.id);
    }
}
exports.InMemoryUserRepository = InMemoryUserRepository;
//# sourceMappingURL=InMemoryUserRepository.js.map