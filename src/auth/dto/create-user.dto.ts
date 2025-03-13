import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

/**
 * Objeto de Transferencia de Datos (DTO) para la creación de usuarios.
 *
 * @description Contiene los campos necesarios y reglas de validación para crear un nuevo usuario
 *
 * @property {string} [name] - Nombre del usuario
 * - Debe ser una cadena de texto
 * - Mínimo 3 caracteres
 *
 * @property {string} [password] - Contraseña del usuario
 * - Debe ser una cadena de texto
 * - Longitud entre 5 y 15 caracteres
 * - Debe contener al menos:
 *   - Una letra mayúscula
 *   - Una letra minúscula
 *   - Un número
 */
export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(5)
  @MaxLength(15)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña debe tener una letra mayúscula, una minúscula y un número',
  })
  password: string;
}
