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
exports.OpinionsController = void 0;
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const opinions_service_1 = require("./opinions.service");
const create_opinion_dto_1 = require("./dto/create-opinion.dto");
const get_user_decorator_1 = require("../auth/decorators/get-user.decorator");
const valid_roles_1 = require("../auth/interfaces/valid_roles");
const paginationDto_dto_1 = require("../common/dto/paginationDto.dto");
let OpinionsController = class OpinionsController {
    constructor(opinionsService) {
        this.opinionsService = opinionsService;
    }
    create(createOpinionDto, userId) {
        return this.opinionsService.create(userId, createOpinionDto);
    }
    findAll(paginationDto) {
        return this.opinionsService.findAll(paginationDto);
    }
    findById(id, paginationDto) {
        return this.opinionsService.findById(id, paginationDto);
    }
    remove(id) {
        return this.opinionsService.delete(id);
    }
};
exports.OpinionsController = OpinionsController;
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_opinion_dto_1.CreateOpinionDto, String]),
    __metadata("design:returntype", Promise)
], OpinionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [paginationDto_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], OpinionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_decorator_1.Auth)(valid_roles_1.ValidRoles.admin),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, paginationDto_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], OpinionsController.prototype, "findById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorator_1.Auth)(valid_roles_1.ValidRoles.admin),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OpinionsController.prototype, "remove", null);
exports.OpinionsController = OpinionsController = __decorate([
    (0, common_1.Controller)('opinions'),
    __metadata("design:paramtypes", [opinions_service_1.OpinionsService])
], OpinionsController);
//# sourceMappingURL=opinions.controller.js.map