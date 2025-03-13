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
import { PaginationDto } from '../../common/dto/paginationDto.dto';

@Controller('/product/prominents')
export class ProminentsController {
  constructor(private readonly prominentsService: ProminentsService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createProminentDto: CreateProminentDto) {
    return this.prominentsService.create(createProminentDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.prominentsService.findAll(paginationDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.prominentsService.remove(id);
  }
}
