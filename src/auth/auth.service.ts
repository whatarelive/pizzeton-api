import * as bcryptjs from 'bcryptjs';
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, LoginUserDto } from './dto';
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

      const user = await this.prisma.user.create({
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
        token: this.genJwt({ email: user.email }),
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
      throw new UnauthorizedException('Credentials are not valid (email).');

    if (!bcryptjs.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password).');

    delete user.password;

    return {
      ...user,
      token: this.genJwt({ email: user.email }),
    };
  }

  // Método para generar el jwt del usuario.
  private genJwt(payload: JwtPayload) {
    return this.jwt.sign(payload);
  }

  // Método para manejar las excepciones no controladas.
  private handlerError(error: any): never {
    if (error.code === 'P2002') {
      throw new BadRequestException(`Value of ${error.meta.target} is exists.`);
    }

    throw new InternalServerErrorException(
      `Can't create or read User - Check Server logs`,
    );
  }
}
