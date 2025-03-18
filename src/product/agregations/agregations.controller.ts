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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AgregationsService } from './agregations.service';
import { CreateAgregationDto } from './dto/create-agregation.dto';
import { UpdateAgregationDto } from './dto/update-agregation.dto';

/**
 * Controlador que maneja todas las operaciones relacionadas con los agregos
 *
 * @description Gestiona las operaciones CRUD para los agregos
 */
@Controller('/product/agregations')
export class AgregationsController {
  // Se inyecta el servicio que maneja la lógica de negocio de agregos
  constructor(private readonly agregationsService: AgregationsService) {}

  // Crea un nuevo agrego.
  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createAgregationDto: CreateAgregationDto) {
    return this.agregationsService.create(createAgregationDto);
  }

  // Obtiene todos los agregos.
  @Get()
  findAll() {
    return this.agregationsService.findAll();
  }

  // Actualiza un agrego existente.
  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateAgregationDto: UpdateAgregationDto,
  ) {
    return this.agregationsService.update(id, updateAgregationDto);
  }

  // Elimina un agrego
  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.agregationsService.delete(id);
  }
}
