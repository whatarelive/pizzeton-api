import type { UUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    create(createUserDto: CreateUserDto): Promise<{
        token: string;
        name: string;
        email: string;
        password: string;
        isBaned: boolean;
        role: string;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        token: string;
        name: string;
        email: string;
        password: string;
        isBaned: boolean;
        role: string;
    }>;
    findAll(paginationDto: PaginationDto): Promise<{
        name: string;
        email: string;
        isBaned: boolean;
        id: string;
        role: string;
    }[]>;
    update(id: UUID, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        email: string;
        password: string;
        isBaned: boolean;
        id: string;
        role: string;
    }>;
    private genJwt;
    private handlerError;
}
