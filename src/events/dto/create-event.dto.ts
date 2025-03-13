import { IsBoolean, IsString, Max, Min } from 'class-validator';

/**
 * Objeto de Transferencia de Datos (DTO) para la creación de eventos.
 *
 * @description Contiene los campos necesarios y reglas de validación para crear un nuevo evento
 *
 * @property {string} [title] - Título del Evento
 * - Debe ser una cadena de texto
 * - Mínimo 5 caracteres
 * - Máximo 50 caracteres
 *
 * @property {string} [subtitle] - Descripción del Evento
 * - Debe ser una cadena de texto
 * - Mínimo 15 caracteres
 * - Máximo 150 caracteres
 *
 * @property {boolean} [active] - Si el evento esta activo o no
 * - Debe ser de tipo booleano
 */
export class CreateEventDto {
  @IsString()
  @Min(5)
  @Max(50)
  title: string;

  @IsString()
  @Min(15)
  @Max(150)
  subtitle: string;

  @IsBoolean()
  active: boolean;
}
