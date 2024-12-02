import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OpinionsService } from './opinions.service';
import { CreateOpinionDto } from './dto/create-opinion.dto';

@Controller('opinions')
export class OpinionsController {
  constructor(private readonly opinionsService: OpinionsService) {}

  @Post()
  create(@Body() createOpinionDto: CreateOpinionDto) {
    return this.opinionsService.create(createOpinionDto);
  }

  @Get()
  findAll() {
    return this.opinionsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opinionsService.remove(+id);
  }
}
