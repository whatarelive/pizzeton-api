import type { UUID } from 'crypto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    createUser(createUserDto: CreateUserDto): Promise<{
        token: string;
        name: string;
        email: string;
        password: string;
        isBaned: boolean;
        role: string;
    }>;
    loginUser(loginUserDto: LoginUserDto): Promise<{
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
    updateUser(id: UUID, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        email: string;
        password: string;
        isBaned: boolean;
        id: string;
        role: string;
    }>;
}
