import type { UUID } from 'crypto';
import * as bcryptjs from 'bcryptjs';
import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { JwtPayload } from './interfaces/jwt-payload.interface';
import { ErrorHandler } from 'src/common/helpers/ErrorsHandler';

/**
 * Servicio de Autenticación
 *
 * @description Maneja todas las operaciones relacionadas con la autenticación de usuarios
 * incluyendo registro, inicio de sesión, actualización y gestión de tokens JWT
 */
@Injectable()
export class AuthService {
  // Inyección de las dependencias necesarias en el servicio.
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly errorHandler: ErrorHandler,
  ) {}

  /**
   * Registra un nuevo usuario en el sistema
   * @param createUserDto - DTO con los datos necesarios para crear un usuario
   * @returns Objeto con los datos del usuario creado y su token JWT
   * @throws ErrorHandler si ocurre algún error durante el proceso
   */
  async create(createUserDto: CreateUserDto) {
    try {
      // Desectructuración del objeto DTO
      const { password, name } = createUserDto;

      // Se ingresa el nuevo usuario en la Base de datos
      const { id, ...user } = await this.prisma.user.create({
        data: {
          id: crypto.randomUUID(),
          name: name.trim(),
          password: bcryptjs.hashSync(password, 5), // Encripta la contraseña con un salt de 5
        },
      });

      // Elimina la contraseña del objeto de respuesta por seguridad
      delete user.password;

      // Se retorna el usuario y el token
      return {
        ...user,
        token: this.genJwt({ id }),
      };
    } catch (error) {
      // En caso de error se maneja en una clase externa.
      this.errorHandler.purge(error, 'User');
    }
  }

  /**
   * Maneja el proceso de inicio de sesión de un usuario
   * @param loginUserDto - DTO con las credenciales del usuario
   * @returns Objeto con los datos del usuario y su token JWT
   * @throws BadRequestException si las credenciales son incorrectas
   */
  async login(loginUserDto: CreateUserDto) {
    // Desectructuración del objeto DTO
    const { name, password } = loginUserDto;

    // Busca el usuario por su nombre
    const user = await this.prisma.user.findUnique({
      where: { name },
    });

    // Verifica si el usuario existe
    if (!user)
      throw new BadRequestException({
        field: 'email',
        message: 'Correo electronico incorrecto.',
      });

    // Verifica si la contraseña es correcta
    if (!bcryptjs.compareSync(password, user.password))
      throw new BadRequestException({
        field: 'password',
        message: 'Contraseña Incorrecta.',
      });

    const { id, ...rest } = user;

    // Elimina la contraseña del objeto de respuesta por seguridad
    delete user.password;

    return {
      ...rest,
      token: this.genJwt({ id }),
    };
  }

  /**
   * Revalida y genera un nuevo token JWT para un usuario
   * @param id - UUID del usuario
   * @returns Objeto con datos básicos del usuario y su nuevo token
   * @throws ErrorHandler si ocurre algún error durante el proceso
   */
  async createNewToken(id: UUID) {
    try {
      // Se extrae el usuario por su id
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: { name: true },
      });

      // Se retorna el usuario y su nuevo token
      return {
        ...user,
        token: this.genJwt({ id }),
      };
    } catch (error) {
      // En caso de error se maneja en una clase externa.
      this.errorHandler.purge(error, 'User');
    }
  }

  /**
   * Actualiza la información de un usuario
   * @param id - UUID del usuario a actualizar
   * @param updateUserDto - DTO con los datos a actualizar
   * @returns Usuario actualizado
   * @throws ErrorHandler si ocurre algún error durante el proceso
   */
  async update(id: UUID, updateUserDto: UpdateUserDto) {
    try {
      // Se actualiza los datos del usuario con el id.
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      // En caso de error se maneja en una clase externa.
      this.errorHandler.purge(error, 'User');
    }
  }

  /**
   * Genera un token JWT para el usuario
   * @param payload - Datos a incluir en el token (ID del usuario)
   * @returns Token JWT generado
   */
  private genJwt(payload: JwtPayload) {
    return this.jwt.sign(payload);
  }
}
