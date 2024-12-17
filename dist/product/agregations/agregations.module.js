"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgregationsModule = void 0;
const common_1 = require("@nestjs/common");
const agregations_service_1 = require("./agregations.service");
const agregations_controller_1 = require("./agregations.controller");
const prisma_service_1 = require("../../prisma.service");
const auth_module_1 = require("../../auth/auth.module");
let AgregationsModule = class AgregationsModule {
};
exports.AgregationsModule = AgregationsModule;
exports.AgregationsModule = AgregationsModule = __decorate([
    (0, common_1.Module)({
        controllers: [agregations_controller_1.AgregationsController],
        providers: [prisma_service_1.PrismaService, agregations_service_1.AgregationsService],
        imports: [auth_module_1.AuthModule],
    })
], AgregationsModule);
//# sourceMappingURL=agregations.module.js.map