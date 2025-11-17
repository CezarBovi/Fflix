"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoAsset = void 0;
const crypto_1 = require("crypto");
const Entity_1 = require("../../../../shared/domain/Entity");
class VideoAsset extends Entity_1.Entity {
    constructor(props, id) {
        super(props, id);
    }
    get title() {
        return this.props.title;
    }
    get status() {
        return this.props.status;
    }
    publish() {
        return new VideoAsset({ ...this.props, status: 'published' }, this.id);
    }
    static create(props) {
        return new VideoAsset(props, (0, crypto_1.randomUUID)());
    }
    static restore(props, id) {
        return new VideoAsset(props, id);
    }
}
exports.VideoAsset = VideoAsset;
//# sourceMappingURL=VideoAsset.js.map