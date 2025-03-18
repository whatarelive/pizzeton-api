import { randomUUID, type UUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDTO } from 'src/product/dto/create-product.dto';
import { UpdateProductDTO } from 'src/product/dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';
import { ErrorHandler } from 'src/common/helpers/ErrorsHandler';
import { FilesService } from 'src/files/files.service';

/**
 * Servicio para la gestión de productos
 *
 * @description Proporciona funcionalidades para crear, listar, actualizar y eliminar productos
 */
@Injectable()
export class ProductService {
  // Inyección de dependencias
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: FilesService,
    private readonly errorHandler: ErrorHandler,
  ) {}

  /**
   * Crea un nuevo producto con una imagen asociada
   * @param file Archivo de imagen a subir
   * @param createProductDto Datos del producto a crear
   * @returns El producto creado
   */
  async create(file: Express.Multer.File, createProduct: CreateProductDTO) {
    try {
      // Subir la imagen a Cloudinary
      const { public_id, secure_url } = await this.cloudinary.uploadImage(file);

      // Crear el producto en la base de datos
      return await this.prisma.product.create({
        data: {
          id: randomUUID(),
          imgId: public_id,
          imgUrl: secure_url,
          ...createProduct,
        },
      });
    } catch (error) {
      this.errorHandler.purge(error, 'Product');
    }
  }

  /**
   * Obtiene todos los productos, con opción de filtrar por categorías
   * @param paaginationDto Parámetros de paginación y filtrado
   * @returns Lista de productos
   */
  async findAll(paginationDto: PaginationDto) {
    const { category } = paginationDto;

    // Si no se especifica el filtro de categoría, devolver todos los productos
    if (!category) {
      return await this.prisma.product.findMany();
    }

    // Buscar todos los productos por categoría
    return await this.prisma.product.findMany({
      where: {
        category: {
          contains: category,
        },
      },
    });
  }

  /**
   * Actualiza un producto existente
   * @param id Identificador único del producto
   * @param file Archivo de imagen nuevo (opcional)
   * @param updateProductDto Datos a actualizar
   * @returns El producto actualizado
   */
  async update(
    id: UUID,
    file: Express.Multer.File,
    updateProduct: UpdateProductDTO,
  ) {
    try {
      // Si se proporciona un nuevo archivo, actualizar la imagen
      if (file) {
        const { public_id, secure_url } = await this.cloudinary.updateImage(
          updateProduct.imgID,
          file,
        );

        // Se muta la información del DTO
        updateProduct.imgID = public_id;
        updateProduct.imgUrl = secure_url;
      }

      // Actualizar el producto en la base de datos
      return await this.prisma.product.update({
        where: { id },
        data: updateProduct,
      });
    } catch (error) {
      this.errorHandler.purge(error, 'Product');
    }
  }

  /**
   * Elimina un producto por su ID
   * @param id Identificador único del producto a eliminar
   * @returns El producto eliminado
   */
  async delete(id: UUID) {
    try {
      // Eliminar el producto de la base de datos
      const product = await this.prisma.product.delete({
        where: { id },
      });

      // Eliminar la imagen asociada de Cloudinary
      await this.cloudinary.deleteImage(product.imgId);

      return product;
    } catch (error) {
      this.errorHandler.purge(error, 'Product');
    }
  }
}
