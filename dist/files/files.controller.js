"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const files_service_1 = require("./files.service");
const upload_file_decorator_1 = require("./decorators/upload-file.decorator");
const valid_files_1 = require("./interfaces/valid_files");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const valid_roles_1 = require("../auth/interfaces/valid_roles");
let FilesController = class FilesController {
    constructor(filesService) {
        this.filesService = filesService;
    }
    async createImage(file) {
        return await this.filesService.uploadImage(file);
    }
    async updateImage(id, file) {
        return await this.filesService.updateImage(id, file);
    }
    async deleteImage(id) {
        return await this.filesService.deleteImage(id);
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, common_1.Post)('image'),
    (0, auth_decorator_1.Auth)(valid_roles_1.ValidRoles.admin),
    (0, upload_file_decorator_1.UploadImage)(valid_files_1.ValidFiles.jpeg, valid_files_1.ValidFiles.jpg, valid_files_1.ValidFiles.png),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "createImage", null);
__decorate([
    (0, common_1.Patch)('image/:id'),
    (0, auth_decorator_1.Auth)(valid_roles_1.ValidRoles.admin),
    (0, upload_file_decorator_1.UploadImage)(valid_files_1.ValidFiles.jpeg, valid_files_1.ValidFiles.jpg, valid_files_1.ValidFiles.png),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "updateImage", null);
__decorate([
    (0, common_1.Delete)('image/:id'),
    (0, auth_decorator_1.Auth)(valid_roles_1.ValidRoles.admin),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "deleteImage", null);
exports.FilesController = FilesController = __decorate([
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FilesController);
//# sourceMappingURL=files.controller.js.map