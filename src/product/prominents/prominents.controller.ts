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
} from '@nestjs/common';
import { ProminentsService } from './prominents.service';
import { CreateProminentDto } from './dto/create-prominent.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid_roles';
import { PaginationDto } from '../../common/dto/paginationDto.dto';

@Controller('/product/prominents')
export class ProminentsController {
  constructor(private readonly prominentsService: ProminentsService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createProminentDto: CreateProminentDto) {
    return this.prominentsService.create(createProminentDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.prominentsService.findAll(paginationDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.prominentsService.remove(id);
  }
}
