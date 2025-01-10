import { randomUUID, type UUID } from 'node:crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';
import { ErrorHandler } from 'src/common/helpers/ErrorsHandler';
import { FilterDto } from 'src/common/dto/filterDto.dto';

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

  async findByCategory(category: string) {
    const products = await this.prisma.product.findMany({
      where: { category, stock: true },
      orderBy: { price: 'asc' },
    });

    if (!products && products.length === 0) {
      throw new NotFoundException(`Not exist products with ${category}`);
    }

    return products;
  }

  // Método para extraer todos los productos de la BD.
  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0, search, category } = paginationDto;

    let products: any;

    if (search && !category) {
      products = await this.prisma.product.findMany({
        take: limit,
        skip: offset,
        where: {
          title: {
            contains: search,
          },
        },
      });
    } else if (category && !search) {
      products = await this.prisma.product.findMany({
        take: limit,
        skip: offset,
        where: {
          category,
        },
      });
    } else if (category && search) {
      products = await this.prisma.product.findMany({
        take: limit,
        skip: offset,
        where: {
          title: {
            contains: search,
          },
          category,
        },
      });
    } else {
      products = await this.prisma.product.findMany({
        take: limit,
        skip: offset,
      });
    }

    return products;
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

  async findTotalProducts(filterDto: FilterDto) {
    const { search, category } = filterDto;

    if (search && !category) {
      return await this.prisma.product.count({
        where: {
          title: {
            contains: search,
          },
        },
      });
    } else if (category && !search) {
      return await this.prisma.product.count({
        where: {
          category: category,
        },
      });
    }

    return await this.prisma.product.count({
      where: undefined,
    });
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
