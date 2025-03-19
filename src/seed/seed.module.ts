import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SeedService } from 'src/seed/seed.service';
import { SeedController } from 'src/seed/seed.controller';

/**
 * Módulo Seed
 *
 * @description Este módulo maneja toda la funcionalidad relacionada con el llenado
 * de la base de datos con información en la aplicación. Gestiona la creación y eliminación de datos.
 */
@Module({
  controllers: [SeedController], // Controlador que maneja las rutas de seed
  providers: [SeedService], // Servicio que implementa la lógica de negocio para el seed
  imports: [
    AuthModule, // Para autenticación y autorización
    PrismaModule, // Para acceso a la base de datos
  ],
})
export class SeedModule {}
