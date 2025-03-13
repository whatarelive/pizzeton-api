import { Provider } from '@nestjs/common';
import { v2 as CloudinaryAPI } from 'cloudinary';

/**
 * Configuración del Proveedor de Cloudinary
 *
 * @description Este proveedor configura el servicio de Cloudinary para el almacenamiento y
 * gestión de archivos.Utiliza variables de entorno para establecer la conexión con Cloudinary
 * usando las credenciales apropiadas.
 */
export const CloudinaryProvider: Provider = {
  // Token utilizado para inyectar este proveedor
  provide: 'CLOUDINARY',

  // Función factory que configura y devuelve la instancia de Cloudinary
  useFactory: () => {
    // Configura Cloudinary con las credenciales de las variables de entorno
    return CloudinaryAPI.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Tu nombre de cloud en Cloudinary
      api_key: process.env.CLOUDINARY_API_KEY, // Tu clave API de Cloudinary
      api_secret: process.env.CLOUDINARY_API_SECRET, // Tu secreto API de Cloudinary
    });
  },
};
