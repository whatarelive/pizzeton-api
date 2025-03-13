import type { UUID } from 'crypto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UploadImage } from 'src/files/decorators/upload-file.decorator';
import { ValidFiles } from 'src/files/interfaces/valid_files';
import { PaginationDto } from '../common/dto/paginationDto.dto';

/**
 * Controlador que maneja todas las operaciones relacionadas con eventos
 *
 * @description Gestiona las operaciones CRUD para eventos, incluyendo la carga de imágenes
 */
@Controller('events')
export class EventsController {
  // Se inyecta el servicio que maneja la lógica de negocio de eventos
  constructor(private readonly eventsService: EventsService) {}

  // Crea un nuevo evento
  @Post()
  @UseGuards(AuthGuard())
  @UploadImage(ValidFiles.jpg, ValidFiles.jpeg, ValidFiles.png)
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createEventDto: CreateEventDto,
  ) {
    return this.eventsService.create(file, createEventDto);
  }

  // Obtiene todos los eventos
  @Get()
  findAll(paginationDto: PaginationDto) {
    return this.eventsService.findAll(paginationDto);
  }

  // Actualiza un evento existente
  @Patch(':id')
  @UseGuards(AuthGuard())
  @UploadImage(ValidFiles.jpg, ValidFiles.jpeg, ValidFiles.png)
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.update(id, file, updateEventDto);
  }

  // Elimina un evento
  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.eventsService.remove(id);
  }
}
