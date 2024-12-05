import { IsDate, IsInt, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateOpinionDto {
  @IsDate()
  date: Date;

  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(5)
  valoration: number;

  @IsString()
  opinion: string;
}
