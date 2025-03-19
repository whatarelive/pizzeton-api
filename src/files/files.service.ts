import { Injectable } from '@nestjs/common';
import { v2 as cloudinaryAPI } from 'cloudinary';
import { unlink } from 'node:fs/promises';

/**
 * @description Servicio para gestionar la carga, actualización y eliminación de archivos de imagen
 * utilizando Cloudinary como servicio de almacenamiento en la nube.
 */
@Injectable()
export class FilesService {
  // Carga de la imagen predeterminada
  private readonly imgID: string = process.env.CLOUDINARY_IMGID_MODAL;
  private readonly imgUrl: string = process.env.CLOUDINARY_IMGURL_MODAL;

  /**
   * Sube una imagen a Cloudinary
   * @param file Archivo de imagen a subir
   * @returns Objeto con la URL segura y el ID público de la imagen
   */
  async uploadImage(file: Express.Multer.File) {
    // Si no se proporciona un archivo, devuelve la imagen predeterminada
    if (!file) {
      return {
        public_id: this.imgID,
        secure_url: this.imgUrl,
      };
    }

    // Ruta temporal donde se guarda el archivo antes de subirlo
    const tempPath = `./static/uploads/${file.originalname}`;

    // Sube la imagen a Cloudinary y obtiene la URL segura y el ID público
    const { secure_url, public_id } =
      await cloudinaryAPI.uploader.upload(tempPath);

    // Elimina el archivo temporal después de subirlo
    await unlink(tempPath);

    return { secure_url, public_id };
  }

  /**
   * Actualiza una imagen existente en Cloudinary
   * @param id ID público de la imagen a actualizar
   * @param file Nuevo archivo de imagen
   * @returns Objeto con la URL segura y el ID público de la nueva imagen
   */
  async updateImage(id: string, file: Express.Multer.File) {
    // Si el ID no es el de la imagen predeterminada, elimina la imagen anterior
    if (id !== this.imgID) {
      await this.deleteImage(id);
    }

    // Sube la nueva imagen
    return await this.uploadImage(file);
  }

  /**
   * Elimina una imagen de Cloudinary
   * @param id ID público de la imagen a eliminar
   * @returns Resultado de la operación de eliminación
   */
  async deleteImage(id: string) {
    // No elimina la imagen si es la predeterminada
    if (id === this.imgID) return;

    // Elimina la imagen de Cloudinary
    return await cloudinaryAPI.uploader.destroy(id);
  }
}
