import type { UUID } from 'node:crypto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProminentsService } from './prominents.service';
import { CreateProminentDto } from './dto/create-prominent.dto';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';

/**
 * Controlador que maneja todas las operaciones relacionadas con los productos destacados
 *
 * @description Gestiona las operaciones CRUD para los productos destacados
 */
@Controller('/product/prominents')
export class ProminentsController {
  // Se inyecta el servicio que maneja la lógica de negocio de productos destacados
  constructor(private readonly prominentsService: ProminentsService) {}

  // Crea un producto destacado
  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createProminentDto: CreateProminentDto) {
    return this.prominentsService.create(createProminentDto);
  }

  // Obtiene todos los productos destacados.
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.prominentsService.findAll(paginationDto);
  }

  // Elimina un producto destacado.
  @Delete(':id')
  @UseGuards(AuthGuard())
  delete(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.prominentsService.delete(id);
  }
}
