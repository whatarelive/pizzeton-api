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
exports.ProminentsController = void 0;
const common_1 = require("@nestjs/common");
const prominents_service_1 = require("./prominents.service");
const create_prominent_dto_1 = require("./dto/create-prominent.dto");
const auth_decorator_1 = require("../../auth/decorators/auth.decorator");
const valid_roles_1 = require("../../auth/interfaces/valid_roles");
const paginationDto_dto_1 = require("../../common/dto/paginationDto.dto");
let ProminentsController = class ProminentsController {
    constructor(prominentsService) {
        this.prominentsService = prominentsService;
    }
    create(createProminentDto) {
        return this.prominentsService.create(createProminentDto);
    }
    findAll(paginationDto) {
        return this.prominentsService.findAll(paginationDto);
    }
    remove(id) {
        return this.prominentsService.remove(id);
    }
};
exports.ProminentsController = ProminentsController;
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(valid_roles_1.ValidRoles.admin),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_prominent_dto_1.CreateProminentDto]),
    __metadata("design:returntype", void 0)
], ProminentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [paginationDto_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ProminentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorator_1.Auth)(valid_roles_1.ValidRoles.admin),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProminentsController.prototype, "remove", null);
exports.ProminentsController = ProminentsController = __decorate([
    (0, common_1.Controller)('/product/prominents'),
    __metadata("design:paramtypes", [prominents_service_1.ProminentsService])
], ProminentsController);
//# sourceMappingURL=prominents.controller.js.map