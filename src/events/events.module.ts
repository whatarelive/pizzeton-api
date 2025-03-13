import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { FilesModule } from 'src/files/files.module';

/**
 * Módulo de Eventos
 *
 * @description Este módulo maneja toda la funcionalidad relacionada con eventos en la aplicación.
 * Gestiona la creación, consulta, actualización y eliminación de eventos.
 */
@Module({
  controllers: [EventsController], // Controlador que maneja las rutas de eventos
  providers: [EventsService], // Servicio que implementa la lógica de negocio para eventos
  imports: [
    AuthModule, // Para autenticación y autorización
    PrismaModule, // Para acceso a la base de datos
    CommonModule, // Para funcionalidad compartida
    FilesModule, // Para operaciones de manejo de archivos
  ],
})
export class EventsModule {}
