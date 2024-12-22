import { IsBoolean, IsString, IsUrl, Max, Min } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @Min(5)
  @Max(50)
  title: string;

  @IsString()
  @Min(15)
  @Max(150)
  subtitle: string;

  @IsString()
  @IsUrl()
  imgUrl: string;

  @IsString()
  imgId: string;

  @IsBoolean()
  active: boolean;
}
