import { randomUUID, type UUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProminentDto } from './dto/create-prominent.dto';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';
import { ErrorHandler } from 'src/common/helpers/ErrorsHandler';

/**
 * Servicio para la gestión de productos destacados
 *
 * @description Proporciona funcionalidades para crear, listar, actualizar y eliminar productos destacados
 */
@Injectable()
export class ProminentsService {
  // Inyección de dependencias
  constructor(
    private readonly prisma: PrismaService,
    private readonly errorHandler: ErrorHandler,
  ) {}

  /**
   * Crea un nuevo producto destacado
   * @param createProminentDto Datos del producto destacado a crear
   * @returns El producto destacado creado
   */
  async create(createProminentDto: CreateProminentDto) {
    // Se recupera el ID del DTO
    const { productId } = createProminentDto;

    try {
      // Crear el producto destacado en la base de datos
      return await this.prisma.prominent.create({
        data: {
          id: randomUUID(),
          product: {
            connect: { id: productId },
          },
        },
      });
    } catch (error) {
      this.errorHandler.purge(error, 'Prominent Product');
    }
  }

  /**
   * Obtiene todos los productos destacados, con opción de paginado
   * @param paaginationDto Parámetros de paginación y filtrado
   * @returns Lista de productos destacados
   */
  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    // Buscar todos los productos destacados
    return await this.prisma.prominent.findMany({
      take: limit,
      skip: offset,
      select: {
        id: true,
        product: {
          select: {
            title: true,
            subtitle: true,
            imgUrl: true,
            price: true,
          },
        },
      },
    });
  }

  /**
   * Elimina un producto destacado por su ID
   * @param id Identificador único del producto destacado a eliminar
   * @returns El producto destacado eliminado
   */
  async delete(id: UUID) {
    try {
      // Eliminar el producto destacado de la base de datos
      return await this.prisma.prominent.delete({
        where: { id },
      });
    } catch (error) {
      this.errorHandler.purge(error, 'Prominent Product');
    }
  }
}
