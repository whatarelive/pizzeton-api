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
} from '@nestjs/common';
import { AgregationsService } from './agregations.service';
import { CreateAgregationDto } from './dto/create-agregation.dto';
import { UpdateAgregationDto } from './dto/update-agregation.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid_roles';

@Controller('agregations')
export class AgregationsController {
  constructor(private readonly agregationsService: AgregationsService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createAgregationDto: CreateAgregationDto) {
    return this.agregationsService.create(createAgregationDto);
  }

  @Get()
  findAll() {
    return this.agregationsService.findAll();
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateAgregationDto: UpdateAgregationDto,
  ) {
    return this.agregationsService.update(id, updateAgregationDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.agregationsService.remove(id);
  }
}
