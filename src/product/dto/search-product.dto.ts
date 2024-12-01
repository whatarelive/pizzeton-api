import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SearchProductDTO {

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    @IsEnum(['Pizza', 'Potres', 'Pastas', 'Bebidas'])
    category: string;
}