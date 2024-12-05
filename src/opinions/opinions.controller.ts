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
import { Auth } from 'src/auth/decorators';
import { Opinion as OpinionModel } from '@prisma/client';
import { OpinionsService } from './opinions.service';
import { CreateOpinionDto } from './dto/create-opinion.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('opinions')
export class OpinionsController {
  constructor(private readonly opinionsService: OpinionsService) {}

  @Post()
  @Auth()
  create(
    @Body() createOpinionDto: CreateOpinionDto,
    @GetUser('id', ParseUUIDPipe) userId: UUID,
  ): Promise<OpinionModel> {
    console.log(userId);
    return this.opinionsService.create(createOpinionDto);
  }

  @Get()
  findAll(): Promise<OpinionModel[]> {
    return this.opinionsService.findAll();
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id', ParseUUIDPipe) id: UUID): Promise<OpinionModel> {
    return this.opinionsService.delete(id);
  }
}
