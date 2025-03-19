import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { CloudinaryProvider } from './providers/cloudinary.provider';

/**
 * FilesModule - Módulo para el manejo de archivos
 *
 * @description Este módulo proporciona funcionalidades para la gestión de archivos,
 * incluyendo la integración con Cloudinary para el almacenamiento en la nube.
 */
@Module({
  providers: [
    CloudinaryProvider, // Proveedor para la integración con Cloudinary
    FilesService, // Servicio para la gestión de archivos
  ],
  exports: [
    CloudinaryProvider, // Exporta el proveedor de Cloudinary para uso en otros módulos
    FilesService, // Exporta el servicio de archivos para uso en otros módulos
  ],
})
export class FilesModule {}
