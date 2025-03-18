import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

/**
 * Objeto de Transferencia de Datos (DTO) para la creación de productos.
 *
 * @description Contiene los campos necesarios y reglas de validación para crear un nuevo producto
 *
 * @property {string} [title] - Título del producto
 * - Debe ser una cadena de texto
 * - No me puede estar vacio
 *
 * @property {string} [subtitle] - Descripción del producto - (opcional)
 * - Debe ser una cadena de texto
 *
 * @property {string} [category] - Categoría del producto
 * - Debe ser uno de los valores especificados
 *
 * @property {number} [price] - Precio del producto
 * - Debe ser un número
 * - Debe ser entero
 * - Debe ser positivo
 *
 * @property {boolean} [stock] - Estado del producto de cara al cliente
 * - Deber ser un valor booleano
 */
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

  @IsNumber()
  @IsInt()
  @IsPositive()
  readonly price: number;

  @IsBoolean()
  readonly stock?: boolean;
}
