import type { UUID } from 'crypto';
import * as bcryptjs from 'bcryptjs';
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  // Método para manejar el registro del usuario.
  async create(createUserDto: CreateUserDto) {
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
    } catch (error) {
      this.handlerError(error);
    }
  }

  // Método para manejar el inicio de sesion del usuario.
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      throw new BadRequestException({
        field: 'email',
        message: 'Correo electronico incorrecto.',
      });

    if (!bcryptjs.compareSync(password, user.password))
      throw new BadRequestException({
        field: 'password',
        message: 'Contraseña Incorrecta.',
      });

    const { id, ...rest } = user;

    delete user.password;

    return {
      ...rest,
      token: this.genJwt({ id }),
    };
  }

  // Método para revalidar el token.
  async createNewToken(id: UUID) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: { name: true, isBaned: true },
      });

      return {
        ...user,
        token: this.genJwt({ id }),
      };
    } catch (error) {
      this.handlerError(error);
    }
  }

  // Método para recuperar todos los usuarios.
  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const users = await this.prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, isBaned: true },
      take: limit,
      skip: offset,
    });

    if (!users) throw new NotFoundException('Not exists users.');

    return users;
  }

  // Método para actualizar el estado del usuario.
  async update(id: UUID, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      this.handlerError(error);
    }
  }

  // Método para generar el jwt del usuario.
  private genJwt(payload: JwtPayload) {
    return this.jwt.sign(payload);
  }

  // Método para manejar las excepciones no controladas.
  private handlerError(error: any): never {
    if (error.code === 'P2002') {
      throw new BadRequestException({
        field: error.meta.target[0],
        message: `Este ${error.meta.target} ya esta ocupado.`,
      });
    }

    throw new InternalServerErrorException(
      `Can't create or read User - Check Server logs`,
    );
  }
}
