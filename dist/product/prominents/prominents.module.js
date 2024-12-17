"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProminentsModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../../auth/auth.module");
const prisma_service_1 = require("../../prisma.service");
const prominents_service_1 = require("./prominents.service");
const prominents_controller_1 = require("./prominents.controller");
let ProminentsModule = class ProminentsModule {
};
exports.ProminentsModule = ProminentsModule;
exports.ProminentsModule = ProminentsModule = __decorate([
    (0, common_1.Module)({
        controllers: [prominents_controller_1.ProminentsController],
        providers: [prominents_service_1.ProminentsService, prisma_service_1.PrismaService],
        imports: [auth_module_1.AuthModule],
    })
], ProminentsModule);
//# sourceMappingURL=prominents.module.js.map