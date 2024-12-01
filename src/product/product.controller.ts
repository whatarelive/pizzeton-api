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
} from '@nestjs/common';
import { Product as ProductModel } from '@prisma/client';
import { ProductService } from './product.service';
import { CreateProductDTO, UpdateProductDTO, SearchProductDTO } from './dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get() // Retorna todos los productos según el término de busqueda.
  findAll(@Query() searchProduct: SearchProductDTO): Promise<ProductModel[]> {
    return this.productService.findAll(searchProduct);
  }

  @Get(':id') // Retorna el producto con ese id.
  findById(@Param('id', ParseUUIDPipe) id: UUID): Promise<ProductModel> {
    return this.productService.findById(id);
  }

  @Post() // Crea un nuevo producto en la BD.
  create(@Body() createProduct: CreateProductDTO): Promise<ProductModel> {
    return this.productService.create(createProduct);
  }

  @Patch(':id') // Actualiza un producto de la BD.
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateProduct: UpdateProductDTO,
  ): Promise<ProductModel> {
    return this.productService.update(id, updateProduct);
  }

  @Delete(':id') // Elimina un producto de la BD.
  delete(@Param('id', ParseUUIDPipe) id: UUID): Promise<ProductModel> {
    return this.productService.delete(id);
  }
}
