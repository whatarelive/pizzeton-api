import { randomUUID, type UUID } from 'crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorHandler } from 'src/common/helpers/ErrorsHandler';
import { FilesService } from 'src/files/files.service';
import { PaginationDto } from '../common/dto/paginationDto.dto';

/**
 * Servicio para la gestión de eventos
 *
 * @description Proporciona funcionalidades para crear, listar, actualizar y eliminar eventos
 */
@Injectable()
export class EventsService {
  // Inyección de dependencias
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: FilesService,
    private readonly errorHandler: ErrorHandler,
  ) {}

  /**
   * Crea un nuevo evento con una imagen asociada
   * @param file Archivo de imagen a subir
   * @param createEventDto Datos del evento a crear
   * @returns El evento creado
   */
  async create(file: Express.Multer.File, createEventDto: CreateEventDto) {
    try {
      // Subir la imagen a Cloudinary
      const { public_id, secure_url } = await this.cloudinary.uploadImage(file);

      // Crear el evento en la base de datos
      return await this.prisma.event.create({
        data: {
          id: randomUUID(),
          imgId: public_id,
          imgUrl: secure_url,
          ...createEventDto,
        },
      });
    } catch (error) {
      this.errorHandler.purge(error, 'Event');
    }
  }

  /**
   * Obtiene todos los eventos, con opción de filtrar solo los activos
   * @param paaginationDto Parámetros de paginación y filtrado
   * @returns Lista de eventos
   */
  async findAll(paaginationDto: PaginationDto) {
    const { active } = paaginationDto;

    // Si no se especifica el filtro de activos, devolver todos los eventos
    if (!active) {
      return await this.prisma.event.findMany();
    }

    // Buscar eventos activos ordenados por título
    const events = await this.prisma.event.findMany({
      where: { active: true },
      orderBy: { title: 'desc' },
    });

    // Verificar si existen eventos
    if (!events) throw new NotFoundException('Events not exists.');

    return events;
  }

  /**
   * Actualiza un evento existente
   * @param id Identificador único del evento
   * @param file Archivo de imagen nuevo (opcional)
   * @param updateEventDto Datos a actualizar
   * @returns El evento actualizado
   */
  async update(
    id: UUID,
    file: Express.Multer.File,
    updateEventDto: UpdateEventDto,
  ) {
    try {
      // Si se proporciona un nuevo archivo, actualizar la imagen
      if (file) {
        const { public_id, secure_url } = await this.cloudinary.updateImage(
          updateEventDto.imgID,
          file,
        );

        // Se muta la información del DTO
        updateEventDto.imgID = public_id;
        updateEventDto.imgUrl = secure_url;
      }

      // Actualizar el evento en la base de datos
      return await this.prisma.event.update({
        where: { id },
        data: {
          ...updateEventDto,
        },
      });
    } catch (error) {
      this.errorHandler.purge(error, 'Event');
    }
  }

  /**
   * Elimina un evento por su ID
   * @param id Identificador único del evento a eliminar
   * @returns El evento eliminado
   */
  async remove(id: UUID) {
    try {
      // Eliminar el evento de la base de datos
      const event = await this.prisma.event.delete({
        where: { id },
      });

      // Eliminar la imagen asociada de Cloudinary
      await this.cloudinary.deleteImage(event.imgId);

      return event;
    } catch (error) {
      this.errorHandler.purge(error, 'Event');
    }
  }
}
