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
exports.OpinionsService = void 0;
const node_crypto_1 = require("node:crypto");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let OpinionsService = class OpinionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createOpinionDto) {
        try {
            return await this.prisma.opinion.create({
                data: {
                    id: (0, node_crypto_1.randomUUID)(),
                    userId,
                    ...createOpinionDto,
                },
            });
        }
        catch (error) {
            this.handlerError(error);
        }
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const opinons = await this.prisma.opinion.findMany({
            take: limit,
            skip: offset,
        });
        if (!opinons || opinons.length === 0)
            throw new common_1.NotFoundException('Opinions not exists.');
        return opinons;
    }
    async findById(id, paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const opinions = await this.prisma.opinion.findMany({
            where: {
                userId: { equals: id },
            },
            take: limit,
            skip: offset,
        });
        if (!opinions || opinions.length === 0)
            throw new common_1.NotFoundException('Opinions not exists.');
        return opinions;
    }
    async delete(id) {
        try {
            return await this.prisma.opinion.delete({
                where: { id },
            });
        }
        catch (error) {
            this.handlerError(error);
        }
    }
    handlerError(error) {
        if (error.code === 'P2025') {
            throw new common_1.NotFoundException(`Opinion with not exists.`);
        }
        throw new common_1.InternalServerErrorException(`Can't creant Opinion - Check Server logs`);
    }
};
exports.OpinionsService = OpinionsService;
exports.OpinionsService = OpinionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OpinionsService);
//# sourceMappingURL=opinions.service.js.map