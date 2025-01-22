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
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Opinion as OpinionModel } from '@prisma/client';
import { OpinionsService } from './opinions.service';
import { CreateOpinionDto } from './dto/create-opinion.dto';
import { ValidRoles } from 'src/auth/interfaces/valid_roles';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';

@Controller('opinions')
export class OpinionsController {
  constructor(private readonly opinionsService: OpinionsService) {}

  @Post()
  create(@Body() createOpinionDto: CreateOpinionDto): Promise<OpinionModel> {
    return this.opinionsService.create(createOpinionDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.opinionsService.findAll(paginationDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: UUID): Promise<OpinionModel> {
    return this.opinionsService.delete(id);
  }
}
