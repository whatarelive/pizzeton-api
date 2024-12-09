import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  readonly limit?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly offset?: number;
}
