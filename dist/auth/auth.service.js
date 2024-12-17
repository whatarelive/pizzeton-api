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
exports.AuthService = void 0;
const bcryptjs = require("bcryptjs");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async create(createUserDto) {
        try {
            const { password, email, name } = createUserDto;
            const { id, ...user } = await this.prisma.user.create({
                data: {
                    id: crypto.randomUUID(),
                    name: name.trim(),
                    email: email.toLocaleLowerCase().trim(),
                    password: bcryptjs.hashSync(password, 5),
                },
            });
            delete user.password;
            return {
                ...user,
                token: this.genJwt({ id }),
            };
        }
        catch (error) {
            this.handlerError(error);
        }
    }
    async login(loginUserDto) {
        const { email, password } = loginUserDto;
        const { id, ...user } = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user)
            throw new common_1.UnauthorizedException('Credentials are not valid (email).');
        if (!bcryptjs.compareSync(password, user.password))
            throw new common_1.UnauthorizedException('Credentials are not valid (password).');
        delete user.password;
        return {
            ...user,
            token: this.genJwt({ id }),
        };
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const users = await this.prisma.user.findMany({
            select: { id: true, email: true, name: true, role: true, isBaned: true },
            take: limit,
            skip: offset,
        });
        if (!users)
            throw new common_1.NotFoundException('Not exists users.');
        return users;
    }
    async update(id, updateUserDto) {
        try {
            return await this.prisma.user.update({
                where: { id },
                data: updateUserDto,
            });
        }
        catch (error) {
            this.handlerError(error);
        }
    }
    genJwt(payload) {
        return this.jwt.sign(payload);
    }
    handlerError(error) {
        if (error.code === 'P2002') {
            throw new common_1.BadRequestException(`Value of ${error.meta.target} is exists.`);
        }
        throw new common_1.InternalServerErrorException(`Can't create or read User - Check Server logs`);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map