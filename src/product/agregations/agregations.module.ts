import { Module } from '@nestjs/common';
import { AgregationsService } from './agregations.service';
import { AgregationsController } from './agregations.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';

/**
 * Módulo de Agregos
 *
 * @description Este módulo maneja toda la funcionalidad relacionada con agregos de los productos en la aplicación.
 * Gestiona la creación, consulta, actualización y eliminación de agregos.
 */
@Module({
  controllers: [AgregationsController], // Controlador que maneja las rutas de agregos
  providers: [AgregationsService], // Servicio que implementa la lógica de negocio para agregos
  imports: [
    AuthModule, // Para autenticación y autorización
    PrismaModule, // Para acceso a la base de datos
    CommonModule, // Para funcionalidad compartida
  ],
})
export class AgregationsModule {}
