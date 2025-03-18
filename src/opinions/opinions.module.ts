import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { OpinionsController } from './opinions.controller';
import { OpinionsService } from './opinions.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';

/**
 * Módulo de Opiniones
 *
 * @description Este módulo maneja toda la funcionalidad relacionada con las opiniones en la aplicación.
 * Gestiona la creación, consulta y eliminación de opiniones.
 */
@Module({
  controllers: [OpinionsController], // Controlador que maneja las rutas de opiniones
  providers: [OpinionsService], // Servicio que implementa la lógica de negocio para las opiniones
  imports: [
    AuthModule, // Para autenticación y autorización
    PrismaModule, // Para acceso a la base de datos
    CommonModule, // Para funcionalidad compartida
  ],
})
export class OpinionsModule {}
