import { PartialType } from '@nestjs/mapped-types';
import { CreateAgregationDto } from './create-agregation.dto';

/**
 *  Objeto de Transferencia de Datos (DTO) para actualizar los agregos en el sistema.
 *
 * @description Esta clase extiende de CreateAgregationDto usando PartialType, lo que significa
 * que todas las propiedades heredadas son opcionales. Esto permite realizar actualizaciones
 * parciales de los agregos, pudiendo modificar solo los campos necesarios.
 *
 * @extends {PartialType(CreateAgregationDto)}
 *
 * @property {string} [title] - Título del agrego (opcional)
 * - Debe ser una cadena de texto
 * - No me puede estar vacio
 *
 * @property {number} [price] - Precio del agrego (opcional)
 * - Debe ser un número
 * - Debe ser entero
 * - Debe ser positivo
 */
export class UpdateAgregationDto extends PartialType(CreateAgregationDto) {}
