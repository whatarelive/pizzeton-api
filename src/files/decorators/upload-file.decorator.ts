import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

/**
 * Decorador personalizado para subir imágenes
 * @param args - Extensiones de archivo permitidas (por ejemplo: 'jpg', 'png', 'jpeg')
 * @returns Decorador compuesto que aplica el interceptor de archivos con configuración personalizada
 */
export const UploadImage = (...args: string[]) => {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor('file', {
        /**
         * Función de filtro de archivos
         * Verifica si el archivo existe y si su extensión está permitida
         * @param _req - Objeto de solicitud (no utilizado)
         * @param file - Archivo cargado
         * @param callback - Función de devolución de llamada para indicar si el archivo es aceptado
         */
        fileFilter(_req, file, callback) {
          // Rechaza el archivo si no se encuentra en la peticion
          if (!file) {
            return callback(null, false);
          }

          // Extrae la extensión del archivo del tipo MIME
          const fileExtension = file.mimetype.split('/')[1];

          // Verifica si la extensión está en la lista de extensiones permitidas
          if (args.includes(fileExtension)) {
            return callback(null, true);
          }

          // Rechaza el archivo si la extensión no está permitida
          return callback(null, false);
        },
        /**
         * Configuración de almacenamiento
         * Define dónde y cómo se guardarán los archivos
         */
        storage: diskStorage({
          // Directorio donde se guardarán los archivos
          destination: './static/uploads',
          /**
           * Función para determinar el nombre del archivo guardado
           * @param _req - Objeto de solicitud (no utilizado)
           * @param file - Archivo cargado
           * @param callback - Función de devolución de llamada para establecer el nombre del archivo
           */
          filename(_req, file, callback) {
            callback(null, file.originalname);
          },
        }),
      }),
    ),
  );
};
