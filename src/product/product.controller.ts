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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Product as ProductModel } from '@prisma/client';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post() // Crea un nuevo producto en la BD.
  @UseGuards(AuthGuard())
  create(@Body() createProduct: CreateProductDTO): Promise<ProductModel> {
    return this.productService.create(createProduct);
  }

  @Get('/size')
  // @Auth(ValidRoles.admin)
  findTotalProducts(@Query() paginationDto: PaginationDto) {
    return this.productService.findTotalProducts(paginationDto);
  }

  @Get() // Retorna todos los productos.
  findAll(@Query() paginationDto: PaginationDto): Promise<ProductModel[]> {
    return this.productService.findAll(paginationDto);
  }

  @Get(':id') // Retorna el producto con ese id.
  @UseGuards(AuthGuard())
  findById(@Param('id', ParseUUIDPipe) id: UUID): Promise<ProductModel> {
    return this.productService.findById(id);
  }

  @Patch(':id') // Actualiza un producto de la BD.
  @UseGuards(AuthGuard())
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateProduct: UpdateProductDTO,
  ): Promise<ProductModel> {
    return this.productService.update(id, updateProduct);
  }

  @Delete(':id') // Elimina un producto de la BD.
  @UseGuards(AuthGuard())
  delete(@Param('id', ParseUUIDPipe) id: UUID): Promise<ProductModel> {
    return this.productService.delete(id);
  }
}
