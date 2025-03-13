import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

/**
 * Objeto de Transferencia de Datos (DTO) para el manejo de query-params.
 *
 * @description Contiene los campos necesarios y reglas de validación para el manejo de los query-params
 *
 * @property {string} [search] - Parámetro de busqueda - opcional
 * - Debe ser una cadena de texto
 *
 * @property {string} [category] - Parámetro filtrado de los productos por categoría - opcional
 * - Debe ser una cadena de texto
 *
 * @property {boolean} [active] - Parámetro filtrado por visibilidad del recurso - opcional
 * - Debe ser un valor booleano
 *
 * @property {number} [limit] - Parámetro que define la cantidad de objetos por petición - opcional
 * - Debe ser un número
 * - Debe ser entero
 * - Debe ser positivo
 * - Valor minimo aceptable es 1
 *
 * @property {number} [offset] - Parámetro que define la página actual - opcional
 * - Debe ser un número
 * - Debe ser entero
 * - Debe ser positivo
 * - Valor minimo aceptable es 0
 */
export class PaginationDto {
  @IsOptional()
  @IsString()
  readonly search?: string;

  @IsOptional()
  @IsString()
  readonly category?: string;

  @IsBoolean()
  readonly active?: boolean;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsInt()
  @Min(1)
  readonly limit?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsInt()
  @Min(0)
  readonly offset?: number;
}
