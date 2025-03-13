import {
  createParamDecorator,
  InternalServerErrorException,
  type ExecutionContext,
} from '@nestjs/common';

/**
 * Decorador personalizado para obtener la información del usuario autenticado.
 * 
 * @description Este decorador permite extraer la información del usuario desde la request.
 * Puede ser usado en los controladores para obtener el usuario completo o una propiedad específica.
 
 * @param {string} [data] - Propiedad específica del usuario que se desea obtener (opcional).
 * Si no se proporciona, retorna el objeto usuario completo.
 * 
 * @throws {InternalServerErrorException} Si no se encuentra el usuario en la request.
 */
export const GetUser = createParamDecorator(
  // Función del decorador que recibe el dato opcional y el contexto
  (data: string, ctx: ExecutionContext) => {
    // Obtiene el objeto request del contexto HTTP
    const req = ctx.switchToHttp().getRequest();

    // Extrae el usuario de la request (previamente establecido por el guard de autenticación)
    const user = req.user;

    // Verifica si existe el usuario en la request
    if (!user)
      throw new InternalServerErrorException('User not found (request).');

    // Retorna la propiedad específica si se proporciona data, o el usuario completo si no
    return data ? user[data] : user;
  },
);
