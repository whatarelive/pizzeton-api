import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

/**
 *  Objeto de Transferencia de Datos (DTO) para actualizar usuarios en el sistema.
 *
 * @description Esta clase extiende de CreateUserDto usando PartialType, lo que significa
 * que todas las propiedades heredadas son opcionales. Esto permite realizar actualizaciones
 * parciales de los usuarios, pudiendo modificar solo los campos necesarios.
 *
 * @extends {PartialType(CreateUserDto)}
 *
 * @property {string} [name] - Nombre del usuario (opcional)
 * - Debe ser una cadena de texto
 * - Mínimo 3 caracteres
 *
 * @property {string} [password] - Contraseña del usuario (opcional)
 * - Debe ser una cadena de texto
 * - Longitud entre 5 y 15 caracteres
 * - Debe contener al menos:
 *   - Una letra mayúscula
 *   - Una letra minúscula
 *   - Un número
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
