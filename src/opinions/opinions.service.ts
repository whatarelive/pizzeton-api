import { randomUUID, type UUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOpinionDto } from './dto/create-opinion.dto';
import { PaginationDto } from '../common/dto/paginationDto.dto';
import { ErrorHandler } from 'src/common/helpers/ErrorsHandler';

/**
 * Servicio para la gestión de opiniones
 *
 * @description Proporciona funcionalidades para crear, listar y eliminar opiniones
 */
@Injectable()
export class OpinionsService {
  // Inyección de dependencias
  constructor(
    private readonly prisma: PrismaService,
    private readonly errorHandler: ErrorHandler,
  ) {}

  /**
   * Crea una nueva opinión
   * @param createOpinionDto Datos de la opinion a crear
   * @returns La opinión creada
   */
  async create(createOpinionDto: CreateOpinionDto) {
    try {
      // Crea una nueva opinión en la base de datos
      return await this.prisma.opinion.create({
        data: {
          id: randomUUID(),
          ...createOpinionDto,
        },
      });
    } catch (error) {
      // Maneja cualquier error que ocurra durante la creación
      this.errorHandler.purge(error, 'Opinions');
    }
  }

  /**
   * Obtiene todas las opiniones, con opción de ordenar ascendentemente
   * @param paaginationDto Parámetros de paginación y filtrado
   * @returns Lista de opiniones
   */
  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    // Obtiene las opiniones de la base de datos con orden y paginación
    return await this.prisma.opinion.findMany({
      orderBy: { date: 'asc' },
      take: limit,
      skip: offset,
    });
  }

  /**
   * Elimina una opinión por su ID
   * @param id Identificador único de la opinión a eliminar
   * @returns La opinión eliminada
   */
  async delete(id: UUID) {
    try {
      // Elimina la opinión de la base de datos
      return await this.prisma.opinion.delete({
        where: { id },
      });
    } catch (error) {
      // Maneja cualquier error que ocurra durante la eliminación
      this.errorHandler.purge(error, 'Opinions');
    }
  }
}
