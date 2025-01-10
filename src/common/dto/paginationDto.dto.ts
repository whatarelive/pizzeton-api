import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsString()
  readonly search?: string;

  @IsOptional()
  @IsString()
  readonly category?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  readonly limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly offset?: number;
}
