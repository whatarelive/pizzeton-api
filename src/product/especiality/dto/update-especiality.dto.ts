import { PartialType } from '@nestjs/mapped-types';
import { CreateEspecialityDto } from './create-especiality.dto';

export class UpdateEspecialityDto extends PartialType(CreateEspecialityDto) {}
