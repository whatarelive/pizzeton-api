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

@Controller('/product/agregations')
export class AgregationsController {
  constructor(private readonly agregationsService: AgregationsService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createAgregationDto: CreateAgregationDto) {
    return this.agregationsService.create(createAgregationDto);
  }

  @Get()
  findAll() {
    return this.agregationsService.findAll();
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateAgregationDto: UpdateAgregationDto,
  ) {
    return this.agregationsService.update(id, updateAgregationDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.agregationsService.remove(id);
  }
}
