import type { UUID } from 'node:crypto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Opinion as OpinionModel } from '@prisma/client';
import { OpinionsService } from './opinions.service';
import { CreateOpinionDto } from './dto/create-opinion.dto';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';

/**
 * Controlador que maneja todas las operaciones relacionadas con las opiniones
 *
 * @description Gestiona las operaciones CRUD para las opiniones.
 */
@Controller('opinions')
export class OpinionsController {
  // Se inyecta el servicio que maneja la lógica de negocio de las opiniones
  constructor(private readonly opinionsService: OpinionsService) {}

  // Crea una nueva opinión
  @Post()
  create(@Body() createOpinionDto: CreateOpinionDto): Promise<OpinionModel> {
    return this.opinionsService.create(createOpinionDto);
  }

  // Obtinene todas las opiniones
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.opinionsService.findAll(paginationDto);
  }

  // Elimina una opinión
  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id', ParseUUIDPipe) id: UUID): Promise<OpinionModel> {
    return this.opinionsService.delete(id);
  }
}
