import { IsDate, IsInt, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateOpinionDto {
  @IsDate()
  readonly date: Date;

  @IsString()
  readonly user: string;

  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(5)
  readonly valoration: number;

  @IsString()
  readonly opinion: string;
}
