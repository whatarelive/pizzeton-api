import { randomUUID, type UUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { CreateAgregationDto } from './dto/create-agregation.dto';
import { UpdateAgregationDto } from './dto/update-agregation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorHandler } from 'src/common/helpers/ErrorsHandler';

/**
 * Servicio para la gestión de agregos
 *
 * @description Proporciona funcionalidades para crear, listar, actualizar y eliminar agregos
 */
@Injectable()
export class AgregationsService {
  // Inyección de dependencias
  constructor(
    private readonly prisma: PrismaService,
    private readonly errorHandler: ErrorHandler,
  ) {}

  /**
   * Crea una nuevo agrego
   * @param createAgregationDto Datos del agrego a crear
   * @returns El agrego creado
   */
  async create(createAgregationDto: CreateAgregationDto) {
    try {
      // Crea una nuevo agrego en la base de datos
      return await this.prisma.agregations.create({
        data: {
          id: randomUUID(),
          ...createAgregationDto,
        },
      });
    } catch (error) {
      this.errorHandler.purge(error, 'Agregations');
    }
  }

  /**
   * Obtiene todos los agregos
   * @returns Lista de agregos
   */
  async findAll() {
    // Obtiene los agregos de la base de datos
    return await this.prisma.agregations.findMany();
  }

  /**
   * Actualiza un agrego existente
   * @param id Identificador único del agrego
   * @param updateAgregationDto Datos a actualizar
   * @returns El agrego actualizado
   */
  async update(id: UUID, updateAgregationDto: UpdateAgregationDto) {
    try {
      // Actualizar el agrego en la base de datos
      return await this.prisma.agregations.update({
        where: { id },
        data: {
          ...updateAgregationDto,
        },
      });
    } catch (error) {
      this.errorHandler.purge(error, 'Agregations');
    }
  }

  /**
   * Elimina un agrego por su ID
   * @param id Identificador único del agrego a eliminar
   * @returns El agrego eliminado
   */
  async delete(id: UUID) {
    try {
      // Elimina el agrego de la base de datos
      return await this.prisma.agregations.delete({
        where: { id },
      });
    } catch (error) {
      this.errorHandler.purge(error, 'Agregations');
    }
  }
}
