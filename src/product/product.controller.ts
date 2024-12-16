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
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';
import { ValidRoles } from 'src/auth/interfaces/valid_roles';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post() // Crea un nuevo producto en la BD.
  @Auth(ValidRoles.admin)
  create(@Body() createProduct: CreateProductDTO): Promise<ProductModel> {
    return this.productService.create(createProduct);
  }

  @Get() // Retorna todos los productos.
  findAll(@Query() paginationDto: PaginationDto): Promise<ProductModel[]> {
    return this.productService.findAll(paginationDto);
  }

  @Get(':category') // Retorna todos los productos de una categoria.
  findByCategory(@Param('category') category: string) {
    return this.productService.findByCategory(category);
  }

  @Get(':id') // Retorna el producto con ese id.
  @Auth(ValidRoles.admin)
  findById(@Param('id', ParseUUIDPipe) id: UUID): Promise<ProductModel> {
    return this.productService.findById(id);
  }

  @Patch(':id') // Actualiza un producto de la BD.
  @Auth(ValidRoles.admin)
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateProduct: UpdateProductDTO,
  ): Promise<ProductModel> {
    return this.productService.update(id, updateProduct);
  }

  @Delete(':id') // Elimina un producto de la BD.
  @Auth(ValidRoles.admin)
  delete(@Param('id', ParseUUIDPipe) id: UUID): Promise<ProductModel> {
    return this.productService.delete(id);
  }
}
