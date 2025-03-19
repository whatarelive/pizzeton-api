import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { ProminentsService } from 'src/product/prominents/prominents.service';
import { ProminentsController } from 'src/product/prominents/prominents.controller';

/**
 * Módulo de Productos destacados
 *
 * @description Este módulo maneja toda la funcionalidad relacionada con productos destacados en la aplicación.
 * Gestiona la creación, consulta y eliminación de productos destacados.
 */
@Module({
  controllers: [ProminentsController], // Controlador que maneja las rutas de productos destacados
  providers: [ProminentsService], // Servicio que implementa la lógica de negocio para productos destacados
  imports: [
    AuthModule, // Para autenticación y autorización
    PrismaModule, // Para acceso a la base de datos
    CommonModule, // Para funcionalidad compartida
  ],
})
export class ProminentsModule {}
