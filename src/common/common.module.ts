import { Module } from '@nestjs/common';
import { ErrorHandler } from './helpers/ErrorsHandler';

/**
 * @Module CommonModule
 * @description Este módulo maneja toda la lógica de sevicios y clases auxiliares de la aplicación
 */
@Module({
  // Servicios necesarios para el módulo
  providers: [ErrorHandler],
  // Exportamos este servicio para que este disponible en otros módulos que importen CommonModule
  exports: [ErrorHandler],
})
export class CommonModule {}
