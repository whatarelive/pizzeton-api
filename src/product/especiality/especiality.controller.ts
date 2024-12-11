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
import { EspecialityService } from './especiality.service';
import { CreateEspecialityDto, UpdateEspecialityDto } from './dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces/valid_roles';

@Controller('/products/especiality')
export class EspecialityController {
  constructor(private readonly especialityService: EspecialityService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createEspecialityDto: CreateEspecialityDto) {
    return this.especialityService.create(createEspecialityDto);
  }

  @Get()
  findAll() {
    return this.especialityService.findAll();
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateEspecialityDto: UpdateEspecialityDto,
  ) {
    return this.especialityService.update(id, updateEspecialityDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.especialityService.remove(id);
  }
}
