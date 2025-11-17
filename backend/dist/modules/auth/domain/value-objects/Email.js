"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
const ValidationError_1 = require("../../../../shared/domain/errors/ValidationError");
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
class Email extends ValueObject_1.ValueObject {
    constructor(value) {
        super({ value });
    }
    static create(value) {
        if (!EMAIL_REGEX.test(value)) {
            throw new ValidationError_1.ValidationError('E-mail inválido');
        }
        return new Email(value.toLowerCase());
    }
    get value() {
        return this.props.value;
    }
}
exports.Email = Email;
//# sourceMappingURL=Email.js.map