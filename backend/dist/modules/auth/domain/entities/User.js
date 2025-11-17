"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const crypto_1 = require("crypto");
const Entity_1 = require("../../../../shared/domain/Entity");
class User extends Entity_1.Entity {
    constructor(props, id) {
        super(props, id);
    }
    get email() {
        return this.props.email;
    }
    get passwordHash() {
        return this.props.passwordHash;
    }
    get name() {
        return this.props.name;
    }
    get roles() {
        return this.props.roles;
    }
    get preferences() {
        return this.props.preferences;
    }
    get history() {
        return this.props.history;
    }
    toSafeJSON() {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            roles: this.roles,
            preferences: this.preferences,
            history: this.history,
        };
    }
    withPreferences(preferences) {
        return User.restore({
            ...this.props,
            preferences,
            updatedAt: new Date(),
        }, this.id);
    }
    static create(props) {
        const now = new Date();
        return new User({ ...props, createdAt: now, updatedAt: now }, (0, crypto_1.randomUUID)());
    }
    static restore(props, id) {
        return new User(props, id);
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map