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
exports.ProminentsService = void 0;
const node_crypto_1 = require("node:crypto");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let ProminentsService = class ProminentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProminentDto) {
        try {
            const { productId } = createProminentDto;
            return await this.prisma.prominent.create({
                data: {
                    id: (0, node_crypto_1.randomUUID)(),
                    product: {
                        connect: { id: productId },
                    },
                },
            });
        }
        catch (error) {
            this.handlerError(error);
        }
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const prominents = await this.prisma.prominent.findMany({
            take: limit,
            skip: offset,
            select: {
                id: true,
                product: {
                    select: {
                        title: true,
                        subtitle: true,
                        imgUrl: true,
                        price: true,
                    },
                },
            },
        });
        if (!prominents || prominents.length === 0) {
            throw new common_1.NotFoundException('Prominents Products not exists.');
        }
        return prominents;
    }
    async remove(id) {
        try {
            return await this.prisma.prominent.delete({
                where: { id },
            });
        }
        catch (error) {
            this.handlerError(error);
        }
    }
    handlerError(error) {
        if (error.code === 'P2002') {
            throw new common_1.BadRequestException(`Prominent Product with ${error.meta.target} is exists.`);
        }
        if (error.code === 'P2025') {
            throw new common_1.NotFoundException(`Prominent Product not exists.`);
        }
        throw new common_1.InternalServerErrorException(`Can't creant Product - Check Server logs`);
    }
};
exports.ProminentsService = ProminentsService;
exports.ProminentsService = ProminentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProminentsService);
//# sourceMappingURL=prominents.service.js.map