import { IsUUID } from 'class-validator';

/**
 * Objeto de Transferencia de Datos (DTO) para la creación de productos destacados.
 *
 * @description Contiene los campos necesarios y reglas de validación para crear un nuevo producto destacado
 *
 * @property {UUID} [productId] - Identificador único del producto
 * - Debe ser del tipo UUID
 */
export class CreateProminentDto {
  @IsUUID()
  productId: string;
}
