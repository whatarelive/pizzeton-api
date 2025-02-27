import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SearchProductDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly search?: string;

  @IsOptional()
  @IsEnum(['Pizzas', 'Potres', 'Pastas', 'Bebidas', 'Otros'])
  readonly category: string;
}
