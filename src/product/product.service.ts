import { randomUUID, type UUID } from 'node:crypto';
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDTO, UpdateProductDTO, SearchProductDTO } from './dto';
import { PaginationDto } from '../common/dto/paginationDto.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  // Método para ingresar un nuevo producto en la BD.
  async create(createProduct: CreateProductDTO): Promise<Product> {
    try {
      return await this.prisma.product.create({
        data: {
          id: randomUUID(),
          ...createProduct,
        },
      });
    } catch (error) {
      this.handlerExceptions(error, createProduct.title);
    }
  }

  // Método para extraer todos los productos de la BD.
  async findAll(
    searchProductDto: SearchProductDTO,
    paginationDto: PaginationDto,
  ): Promise<Product[]> {
    const { category, search } = searchProductDto;
    const { limit = 10, offset = 0 } = paginationDto;

    let product: Prisma.ProductCreateInput[];

    // Buscamos por la categoria si viene en la query.
    if (category && !search) {
      product = await this.prisma.product.findMany({
        where: { category },
      });
    }

    // Buscamos por la término de busqueda si viene en la query y no esta la categoria.
    if (!product && search) {
      product = await this.prisma.product.findMany({
        where: {
          OR: [
            { title: { contains: search } },
            { subtitle: { contains: search } },
          ],
        },
        take: limit,
        skip: offset,
      });
    }

    // Si no se proporciona ningún término de busqueda o categoría se extraen todos los productos.
    if (!product) {
      product = await this.prisma.product.findMany({
        take: limit,
        skip: offset,
      });
    }

    // Si no se encontro ningún producto con las operaciones anteriores se lanza la excepción.
    if (product.length === 0)
      throw new NotFoundException('Products not exists.');

    return product;
  }

  // Método para extraer el producto con ese ID de la BD.
  async findById(id: UUID): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product)
      throw new NotFoundException(`Product with id: ${id} not exists in db.`);

    return product;
  }

  // Método para actualizar un producto de la BD.
  async update(id: UUID, updateProduct: UpdateProductDTO): Promise<Product> {
    try {
      return await this.prisma.product.update({
        where: { id },
        data: updateProduct,
      });
    } catch (error) {
      this.handlerExceptions(error, updateProduct.title);
    }
  }

  // Método para eliminar un producto de la BD.
  async delete(id: UUID): Promise<Product> {
    try {
      return await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      this.handlerExceptions(error, id);
    }
  }

  // Método para manejar las excepciones no controladas
  private handlerExceptions(error: any, value?: any): never {
    if (error.code === 'P2002') {
      throw new BadRequestException(
        `Product with ${error.meta.target}: ${value} is exists.`,
      );
    }

    if (error.code === 'P2025') {
      throw new NotFoundException(`Product with id: ${value} not exists.`);
    }

    throw new InternalServerErrorException(
      `Can't creant Product - Check Server logs`,
    );
  }
}
