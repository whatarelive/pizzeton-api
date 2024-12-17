import { PartialType } from '@nestjs/mapped-types';
import { CreateAgregationDto } from './create-agregation.dto';

export class UpdateAgregationDto extends PartialType(CreateAgregationDto) {}
