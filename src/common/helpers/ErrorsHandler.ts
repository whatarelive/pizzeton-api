import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';

/**
 * @description Clase que maneja los errores comunes de la aplicación, especialmente los relacionados con Prisma ORM
 */
@Injectable()
export class ErrorHandler {
  /**
   * Método que procesa y lanza excepciones específicas basadas en los códigos de error de Prisma
   * @param error - El error capturado que necesita ser procesado
   * @param module - El nombre del módulo donde ocurrió el error
   * @throws BadRequestException - Cuando hay un conflicto de unicidad (código P2002)
   * @throws NotFoundException - Cuando no se encuentra un recurso (código P2025)
   * @throws InternalServerErrorException - Para cualquier otro error no manejado específicamente
   */
  purge(error: any, module: string) {
    // Maneja errores de unicidad (cuando un campo único ya existe en la base de datos)
    if (error.code === 'P2002') {
      throw new BadRequestException({
        field: error.meta.target[0],
        message: `Este ${error.meta.target}: ya esta ocupado.`,
      });
    }

    // Maneja errores de registro no encontrado
    if (error.code === 'P2025') {
      throw new NotFoundException(`Este ${module} con este id no existe.`);
    }

    // Maneja cualquier otro error no especificado
    throw new InternalServerErrorException(
      `Can't creant ${module} - Check Server logs`,
    );
  }
}
