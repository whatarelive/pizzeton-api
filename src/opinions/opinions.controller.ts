import type { UUID } from 'node:crypto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Opinion as OpinionModel } from '@prisma/client';
import { OpinionsService } from './opinions.service';
import { CreateOpinionDto } from './dto/create-opinion.dto';

@Controller('opinions')
export class OpinionsController {
  constructor(private readonly opinionsService: OpinionsService) {}

  @Post()
  create(@Body() createOpinionDto: CreateOpinionDto): Promise<OpinionModel> {
    return this.opinionsService.create(createOpinionDto);
  }

  @Get()
  findAll(): Promise<OpinionModel[]> {
    return this.opinionsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: UUID): Promise<OpinionModel> {
    return this.opinionsService.delete(id);
  }
}
