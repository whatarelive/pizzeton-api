import type { UUID } from 'node:crypto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Product as ProductModel } from '@prisma/client';
import { ProductService } from 'src/product/product.service';
import { CreateProductDTO } from 'src/product/dto/create-product.dto';
import { UpdateProductDTO } from 'src/product/dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';
import { UploadImage } from 'src/files/decorators/upload-file.decorator';
import { ValidFiles } from 'src/files/interfaces/valid_files';

/**
 * Controlador que maneja todas las operaciones relacionadas con los productos
 *
 * @description Gestiona las operaciones CRUD para los productos, incluyendo la carga de imágenes
 */
@Controller('products')
export class ProductController {
  // Se inyecta el servicio que maneja la lógica de negocio de productos
  constructor(private readonly productService: ProductService) {}

  // Crea un nuevo producto.
  @Post()
  @UseGuards(AuthGuard())
  @UploadImage(ValidFiles.jpg, ValidFiles.jpeg, ValidFiles.png)
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProduct: CreateProductDTO,
  ): Promise<ProductModel> {
    return this.productService.create(file, createProduct);
  }

  // Obtiene todos los productos.
  @Get()
  findAll(@Query() paginationDto: PaginationDto): Promise<ProductModel[]> {
    return this.productService.findAll(paginationDto);
  }

  // Actualiza un producto existente.
  @Patch(':id')
  @UseGuards(AuthGuard())
  @UploadImage(ValidFiles.jpg, ValidFiles.jpeg, ValidFiles.png)
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateProduct: UpdateProductDTO,
  ): Promise<ProductModel> {
    return this.productService.update(id, file, updateProduct);
  }

  // Elimina un producto.
  @Delete(':id')
  @UseGuards(AuthGuard())
  delete(@Param('id', ParseUUIDPipe) id: UUID): Promise<ProductModel> {
    return this.productService.delete(id);
  }
}
