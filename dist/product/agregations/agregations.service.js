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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgregationsService = void 0;
const crypto_1 = require("crypto");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let AgregationsService = class AgregationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAgregationDto) {
        try {
            return await this.prisma.agregations.create({
                data: {
                    id: (0, crypto_1.randomUUID)(),
                    ...createAgregationDto,
                },
            });
        }
        catch (error) {
            this.handlerExceptions(error, createAgregationDto.title);
        }
    }
    async findAll() {
        const agregations = await this.prisma.agregations.findMany();
        if (!agregations || agregations.length === 0)
            throw new common_1.NotFoundException('Agregations not exists.');
        return agregations;
    }
    async update(id, updateAgregationDto) {
        try {
            return await this.prisma.agregations.update({
                where: { id },
                data: {
                    ...updateAgregationDto,
                },
            });
        }
        catch (error) {
            this.handlerExceptions(error);
        }
    }
    async remove(id) {
        try {
            return await this.prisma.agregations.delete({
                where: { id },
            });
        }
        catch (error) {
            this.handlerExceptions(error);
        }
    }
    handlerExceptions(error, value) {
        if (error.code === 'P2002') {
            throw new common_1.BadRequestException(`Agregation with ${error.meta.target}: ${value} is exists.`);
        }
        if (error.code === 'P2025') {
            throw new common_1.NotFoundException(`Agregation with id: ${value} not exists.`);
        }
        throw new common_1.InternalServerErrorException(`Can't creant Agregation - Check Server logs`);
    }
};
exports.AgregationsService = AgregationsService;
exports.AgregationsService = AgregationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AgregationsService);
//# sourceMappingURL=agregations.service.js.map