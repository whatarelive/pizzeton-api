import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import { IsString } from 'class-validator';

/**
 *  Objeto de Transferencia de Datos (DTO) para actualizar eventos en el sistema.
 *
 * @description Esta clase extiende de CreateEventDto usando PartialType, lo que significa
 * que todas las propiedades heredadas son opcionales. Esto permite realizar actualizaciones
 * parciales de los eventos, pudiendo modificar solo los campos necesarios.
 *
 * @extends {PartialType(CreateEventDto)}
 *
 * @property {string} [title] - Título del Evento (opcional)
 * - Debe ser una cadena de texto
 * - Mínimo 5 caracteres
 * - Máximo 50 caracteres
 *
 * @property {string} [subtitle] - Descripción del Evento (opcional)
 * - Debe ser una cadena de texto
 * - Mínimo 15 caracteres
 * - Máximo 150 caracteres
 *
 * @property {boolean} [active] - Si el evento esta activo o no (opcional)
 * - Debe ser de tipo booleano
 *
 * @property {string} [imgUrl] - url de la imagen en cloudinary
 * - Debe ser una cadena de texto
 *
 * @property {string} [imgID] - ID de la imagen en cloudinary
 * - Debe ser una cadena de texto
 */
export class UpdateEventDto extends PartialType(CreateEventDto) {
  @IsString()
  imgUrl: string;

  @IsString()
  imgID: string;
}
