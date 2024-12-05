import {
  IsDate,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import type { UUID } from 'node:crypto';

export class CreateOpinionDto {
  @IsDate()
  date: Date;

  @IsUUID()
  userId: UUID;

  @IsNumber()
  @IsInt({})
  @IsPositive()
  valoration: number;

  @IsString()
  opinion: string;
}
