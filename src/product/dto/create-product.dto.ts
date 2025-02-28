import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly subtitle: string;

  @IsString()
  @IsEnum(['Pizza', 'Postres', 'Pastas', 'Bebidas', 'Otros'])
  readonly category: string;

  @IsString()
  @IsUrl()
  readonly imgUrl: string;

  @IsString()
  readonly imgId: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  readonly price: number;
}
