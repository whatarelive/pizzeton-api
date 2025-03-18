import { IsDate, IsInt, IsNumber, IsString, Max, Min } from 'class-validator';

/**
 * Objeto de Transferencia de Datos (DTO) para la creación de opiniones.
 *
 * @description Contiene los campos necesarios y reglas de validación para crear una nueva opinión.
 *
 * @property {Date} [date] - Fecha de creación
 * - Debe ser un dato de tipo fecha
 *
 * @property {string} [user] - Nombre del usuario
 * - Debe ser una cadena de texto
 *
 * @property {number} [valoration] - Puntuación dada por el usuario
 * - Debe ser una cadena de texto
 * - Minino valor es 1
 * - Máximo valor es 5
 *
 * @property {string} [opinion] - Opinión del usuario
 * - Debe ser una cadena de texto
 */
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
