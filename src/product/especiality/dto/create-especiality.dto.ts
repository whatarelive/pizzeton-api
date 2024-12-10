import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateEspecialityDto {
  @IsUUID()
  id: string;

  @IsString()
  @MinLength(25)
  @MaxLength(100)
  description: string;
}
