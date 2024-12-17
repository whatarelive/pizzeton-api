"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const promises_1 = require("node:fs/promises");
let FilesService = class FilesService {
    async uploadImage(file) {
        const tempPath = `./static/uploads/${file.originalname}`;
        const { secure_url, public_id } = await cloudinary_1.v2.uploader.upload(tempPath);
        await (0, promises_1.unlink)(tempPath);
        return { secure_url, public_id };
    }
    async updateImage(id, file) {
        await this.deleteImage(id);
        return await this.uploadImage(file);
    }
    async deleteImage(id) {
        return await cloudinary_1.v2.uploader.destroy(id);
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)()
], FilesService);
//# sourceMappingURL=files.service.js.map