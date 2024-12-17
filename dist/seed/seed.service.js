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
exports.SeedService = void 0;
const crypto_1 = require("crypto");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const products_1 = require("./data/products");
const agregations_1 = require("./data/agregations");
let SeedService = class SeedService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async run() {
        await this.prisma.prominent.deleteMany();
        await this.prisma.product.deleteMany();
        await this.insertNewProducts();
        await this.insertNewProminentProduct();
        await this.insertNewAgregations();
        return `Seed executed`;
    }
    async insertNewProducts() {
        for (const product of products_1.productsSeed) {
            await this.prisma.product.create({
                data: {
                    id: (0, crypto_1.randomUUID)(),
                    ...product,
                },
            });
        }
    }
    async insertNewProminentProduct() {
        for (const product of products_1.productsSeed.slice(3, 7)) {
            await this.prisma.prominent.create({
                data: {
                    id: (0, crypto_1.randomUUID)(),
                    product: {
                        connect: {
                            title: product.title,
                        },
                    },
                },
            });
        }
    }
    async insertNewAgregations() {
        await this.prisma.agregations.deleteMany();
        for (const agregation of agregations_1.aggregationsSeed) {
            await this.prisma.agregations.create({
                data: {
                    id: (0, crypto_1.randomUUID)(),
                    ...agregation,
                },
            });
        }
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SeedService);
//# sourceMappingURL=seed.service.js.map