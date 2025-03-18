import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Módulo de Configuración de Prisma
 *
 * @description Este módulo maneja toda la funcionalidad relacionada con la
 * configuración del cliente de prisma
 */
@Module({
  providers: [PrismaService], // Servicio que implementa la lógica para acceder a la BD
  // Exportamos estos módulos para que estén disponibles en otros módulos que importen PrismaModule
  exports: [PrismaService],
})
export class PrismaModule {}
