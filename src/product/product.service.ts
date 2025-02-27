import { randomUUID, type UUID } from 'node:crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';
import { ErrorHandler } from 'src/common/helpers/ErrorsHandler';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly errorHandler: ErrorHandler,
  ) {}

  // Método para ingresar un nuevo producto en la BD.
  async create(createProduct: CreateProductDTO) {
    try {
      return await this.prisma.product.create({
        data: {
          id: randomUUID(),
          ...createProduct,
        },
      });
    } catch (error) {
      this.errorHandler.purge(error, 'Product');
    }
  }

  // Método para extraer todos los productos de la BD.
  async findAll(paginationDto: PaginationDto) {
    const { category } = paginationDto;

    if (!category) {
      return await this.prisma.product.findMany();
    }

    return await this.prisma.product.findMany({
      where: {
        category: {
          contains: category,
        },
      },
    });
  }

  // Método para extraer el producto con ese ID de la BD.
  async findById(id: UUID) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product)
      throw new NotFoundException(`Product with id: ${id} not exists in db.`);

    return product;
  }

  async findTotalProducts(paginationDto: PaginationDto) {
    const { search, category } = paginationDto;

    if (search && !category) {
      return await this.prisma.product.count({
        where: {
          title: {
            contains: search,
          },
        },
      });
    }

    if (category && !search) {
      return await this.prisma.product.count({
        where: {
          category: category,
        },
      });
    }

    return await this.prisma.product.count();
  }

  // Método para actualizar un producto de la BD.
  async update(id: UUID, updateProduct: UpdateProductDTO) {
    try {
      return await this.prisma.product.update({
        where: { id },
        data: updateProduct,
      });
    } catch (error) {
      this.errorHandler.purge(error, 'Product');
    }
  }

  // Método para eliminar un producto de la BD.
  async delete(id: UUID) {
    try {
      return await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      this.errorHandler.purge(error, 'Product');
    }
  }
}
