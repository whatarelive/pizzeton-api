import {
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

/**
 * Objeto de Transferencia de Datos (DTO) para la creación de agregos.
 *
 * @description Contiene los campos necesarios y reglas de validación para crear un nuevo agrego
 *
 * @property {string} [title] - Título del agrego
 * - Debe ser una cadena de texto
 * - Mínimo 5 caracteres
 * - Máximo 50 caracteres
 *
 * @property {number} [price] - Precio del agrego
 * - Debe ser un número
 * - Debe ser entero
 * - Debe ser positivo
 */
export class CreateAgregationDto {
  @IsString()
  @Min(5)
  @Max(50)
  readonly title: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  readonly price: number;
}
