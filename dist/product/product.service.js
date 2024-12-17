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
exports.ProductService = void 0;
const node_crypto_1 = require("node:crypto");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProductService = class ProductService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProduct) {
        try {
            return await this.prisma.product.create({
                data: {
                    id: (0, node_crypto_1.randomUUID)(),
                    ...createProduct,
                },
            });
        }
        catch (error) {
            this.handlerExceptions(error, createProduct.title);
        }
    }
    async findByCategory(category) {
        const products = await this.prisma.product.findMany({
            where: { category, stock: true },
        });
        if (!products && products.length === 0) {
            throw new common_1.NotFoundException(`Not exist products with ${category}`);
        }
        return products;
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const products = await this.prisma.product.findMany({
            take: limit,
            skip: offset,
        });
        if (!products || products.length === 0)
            throw new common_1.NotFoundException('Products not exists.');
        return products;
    }
    async findById(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
        });
        if (!product)
            throw new common_1.NotFoundException(`Product with id: ${id} not exists in db.`);
        return product;
    }
    async update(id, updateProduct) {
        try {
            return await this.prisma.product.update({
                where: { id },
                data: updateProduct,
            });
        }
        catch (error) {
            this.handlerExceptions(error, updateProduct.title);
        }
    }
    async delete(id) {
        try {
            return await this.prisma.product.delete({
                where: { id },
            });
        }
        catch (error) {
            this.handlerExceptions(error, id);
        }
    }
    handlerExceptions(error, value) {
        if (error.code === 'P2002') {
            throw new common_1.BadRequestException(`Product with ${error.meta.target}: ${value} is exists.`);
        }
        if (error.code === 'P2025') {
            throw new common_1.NotFoundException(`Product with id: ${value} not exists.`);
        }
        throw new common_1.InternalServerErrorException(`Can't creant Product - Check Server logs`);
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map