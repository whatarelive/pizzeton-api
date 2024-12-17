import {
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateAgregationDto {
  @IsString()
  @Min(5)
  @Max(50)
  readonly title: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  readonly price: number;
}
