import { IsEnum, IsInt, IsNumber, IsOptional, IsPositive, IsString, IsUrl } from "class-validator";

export class CreateProductDTO {

    @IsString()
    readonly title: string;
    
    @IsString()
    @IsOptional()
    readonly subtitle: string;
    
    @IsString()
    @IsEnum(['Pizza', 'Potres', 'Pastas', 'Bebidas'])
    readonly category: string;
    
    @IsString()
    @IsUrl()
    readonly imgUrl: string;
    
    @IsNumber()
    @IsInt()
    @IsPositive()
    readonly price: number;
}