"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeHandler = void 0;
const safeHandler = (handler) => (req, res, next) => {
    handler(req, res, next).catch(next);
};
exports.safeHandler = safeHandler;
//# sourceMappingURL=safeHandler.js.map