import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateProductDTO } from './create-product.dto';

/**
 *  Objeto de Transferencia de Datos (DTO) para actualizar productos en el sistema.
 *
 * @description Esta clase extiende de CreateProductDto usando PartialType, lo que significa
 * que todas las propiedades heredadas son opcionales. Esto permite realizar actualizaciones
 * parciales de los productos, pudiendo modificar solo los campos necesarios.
 *
 * @extends {PartialType(CreateProductDto)}
 *
 * @property {string} [title] - Título del producto (opcional)
 * - Debe ser una cadena de texto
 * - No me puede estar vacio
 *
 * @property {string} [subtitle] - Descripción del producto - (opcional)
 * - Debe ser una cadena de texto
 *
 * @property {string} [category] - Categoría del producto (opcional)
 * - Debe ser uno de los valores especificados
 *
 * @property {number} [price] - Precio del producto (opcional)
 * - Debe ser un número
 * - Debe ser entero
 * - Debe ser positivo
 *
 * @property {boolean} [stock] - Estado del producto de cara al cliente (opcional)
 * - Deber ser un valor booleano
 *
 * @property {string} [imgUrl] - url de la imagen en cloudinary
 * - Debe ser una cadena de texto
 *
 * @property {string} [imgID] - ID de la imagen en cloudinary
 * - Debe ser una cadena de texto
 */
export class UpdateProductDTO extends PartialType(CreateProductDTO) {
  @IsString()
  imgUrl: string;

  @IsString()
  imgID: string;
}
