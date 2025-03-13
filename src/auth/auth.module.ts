import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './estrategies/jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';

/**
 * @Module AuthModule
 * @description Este módulo maneja toda la lógica de autenticación y autorización de la aplicación
 */
@Module({
  controllers: [AuthController], // Controlador que maneja las rutas de autenticación
  providers: [AuthService, JwtStrategy], // Servicios necesarios para la autenticación
  imports: [
    PrismaModule, // Módulo para la conexión con la base de datos
    CommonModule, // Módulo con funcionalidades comunes

    // Configuración de Passport para usar JWT como estrategia por defecto
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // Configuración del módulo JWT
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET, // Clave secreta para firmar los tokens
        signOptions: {
          expiresIn: '12h', // Tiempo de expiración del token
        },
      }),
    }),
  ],

  // Exportamos estos módulos para que estén disponibles en otros módulos que importen AuthModule
  exports: [JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
