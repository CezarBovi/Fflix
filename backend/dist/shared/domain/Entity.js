"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
class Entity {
    constructor(props, id) {
        this.props = props;
        this.id = id;
    }
    equals(entity) {
        if (entity === null || entity === undefined) {
            return false;
        }
        if (this === entity) {
            return true;
        }
        return this.id === entity.id;
    }
    toJSON() {
        return { id: this.id, ...this.props };
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map