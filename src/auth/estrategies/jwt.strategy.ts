import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import type { JwtPayload } from '../interfaces/jwt-payload.interface';

/**
 * Estrategia de autenticación JWT para NestJS
 *
 * Esta estrategia se utiliza para validar los tokens JWT en las solicitudes entrantes.
 * Implementa la lógica de verificación del token y recuperación del usuario asociado.
 *
 * @module auth/strategies
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructor de la estrategia JWT
   * @param prisma - Servicio de Prisma para interactuar con la base de datos
   */
  constructor(private readonly prisma: PrismaService) {
    super({
      secretOrKey: process.env.JWT_SECRET, // Clave secreta para verificar la firma del token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token del header 'Authorization'
    });
  }

  /**
   * Valida el payload del token JWT y recupera el usuario correspondiente
   *
   * @param payload - Payload decodificado del token JWT
   * @returns Promise<User> - Retorna el usuario si es válido
   * @throws UnauthorizedException - Si no se encuentra el usuario
   */
  async validate(payload: JwtPayload): Promise<User> {
    // Se extrae el id del usuario del payload del token.
    const { id } = payload;

    // Se busca el usuario por el id dentro de la base de datos.
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    // Si no se encuentra se lanza un error 401.
    if (!user) throw new UnauthorizedException('Token not valid.');

    // Se retorna el usuario valido
    return user;
  }
}
