import { Module } from '@nestjs/common';
import { ProductModule } from 'src/product/product.module';
import { OpinionsModule } from 'src/opinions/opinions.module';
import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';
import { FilesModule } from 'src/files/files.module';
import { SeedModule } from 'src/seed/seed.module';
import { EventsModule } from 'src/events/events.module';
import { PrismaModule } from 'src/prisma/prisma.module';

/**
 * Módulo Principal
 *
 * @description Este módulo maneja la integración de módulos de
 * toda la aplicación
 */
@Module({
  imports: [
    AuthModule, // Módulo de autentificación
    CommonModule, // Módulo de funcionalidades comunes
    FilesModule, // Módulo de manejo de archivos
    ProductModule, // Módulo de Productos
    OpinionsModule, // Módulo de Opiniones
    EventsModule, // Módulo de Eventos
    SeedModule, // Módulo seed de la Base de datos
    PrismaModule, // Módulo de configuración del ORM de la Base de datos
  ],
})
export class AppModule {}
