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
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid_roles';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';

@Controller('opinions')
export class OpinionsController {
  constructor(private readonly opinionsService: OpinionsService) {}

  @Post()
  @Auth()
  create(
    @Body() createOpinionDto: CreateOpinionDto,
    @GetUser('id', ParseUUIDPipe) userId: UUID,
  ): Promise<OpinionModel> {
    return this.opinionsService.create(userId, createOpinionDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.opinionsService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth(ValidRoles.admin)
  findById(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.opinionsService.findById(id, paginationDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: UUID): Promise<OpinionModel> {
    return this.opinionsService.delete(id);
  }
}
