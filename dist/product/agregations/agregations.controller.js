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
exports.AgregationsController = void 0;
const common_1 = require("@nestjs/common");
const agregations_service_1 = require("./agregations.service");
const create_agregation_dto_1 = require("./dto/create-agregation.dto");
const update_agregation_dto_1 = require("./dto/update-agregation.dto");
const auth_decorator_1 = require("../../auth/decorators/auth.decorator");
const valid_roles_1 = require("../../auth/interfaces/valid_roles");
let AgregationsController = class AgregationsController {
    constructor(agregationsService) {
        this.agregationsService = agregationsService;
    }
    create(createAgregationDto) {
        return this.agregationsService.create(createAgregationDto);
    }
    findAll() {
        return this.agregationsService.findAll();
    }
    update(id, updateAgregationDto) {
        return this.agregationsService.update(id, updateAgregationDto);
    }
    remove(id) {
        return this.agregationsService.remove(id);
    }
};
exports.AgregationsController = AgregationsController;
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(valid_roles_1.ValidRoles.admin),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_agregation_dto_1.CreateAgregationDto]),
    __metadata("design:returntype", void 0)
], AgregationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AgregationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auth_decorator_1.Auth)(valid_roles_1.ValidRoles.admin),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_agregation_dto_1.UpdateAgregationDto]),
    __metadata("design:returntype", void 0)
], AgregationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorator_1.Auth)(valid_roles_1.ValidRoles.admin),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AgregationsController.prototype, "remove", null);
exports.AgregationsController = AgregationsController = __decorate([
    (0, common_1.Controller)('agregations'),
    __metadata("design:paramtypes", [agregations_service_1.AgregationsService])
], AgregationsController);
//# sourceMappingURL=agregations.controller.js.map