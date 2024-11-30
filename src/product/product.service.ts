import { randomUUID, type UUID } from 'node:crypto';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDTO, UpdateProductDTO } from './dto';
import type { IProduct } from './interfaces/product.interface';

@Injectable()
export class ProductService {

  constructor(
    private readonly prisma: PrismaService
  ) {}

  // Método para extraer todos los productos de la BD.
  async findAll(): Promise<Product[]> {
    try {
      return await this.prisma.product.findMany();

    } catch(error) {
      this.handlerExceptions(error);
    }
  }

  // Método para extraer el producto con ese ID de la BD.
  async findById( id: UUID ): Promise<Product> {
    try{
      return await this.prisma.product.findUnique({ 
        where: { id }
      });

    } catch(error) {
      this.handlerExceptions(error);
    }
  }

  // Método para extraer todos los productos con esa categoria de la BD.
  async findByCategory( category: string ): Promise<Product[]> {
    try {
      return await this.prisma.product.findMany({ 
        where: { category } 
      });
    
    } catch (error) {
      this.handlerExceptions(error);
    }
  }

  // Método para extraer todos los productos que contengan ese término de busqueda de la BD.
  async findByTerm( term: string ): Promise<Product[]> {
    try {
      await this.prisma.$executeRaw`CREATE VIRTUAL TABLE IF NOT EXISTS products USING fts5(title, subtitle);`;
      
      return await this.prisma.$queryRaw`SELECT * FROM Product WHERE products MATCH ${term}`;
      
    } catch (error) {
      this.handlerExceptions(error);
    }
  }

  // Método para ingresar un nuevo producto en la BD.
  async create( createProduct: CreateProductDTO ): Promise<Product> {
    try {
      const product: IProduct = { 
        id: randomUUID(), 
        ...createProduct 
      };

      return await this.prisma.product.create({ data: product });
      
    } catch (error) {
      this.handlerExceptions(error);
    }
  }

  // Método para actualizar un producto de la BD.
  async update( id: UUID, updateProduct: UpdateProductDTO ): Promise<Product> {
    try {
      return await this.prisma.product.update({
        where: { id },
        data: updateProduct
      });

    } catch (error) {
      this.handlerExceptions(error);
    }
  }

  // Método para eliminar un producto de la BD.
  async delete( id: UUID ): Promise<Product> {
    try {
      return await this.prisma.product.delete({
        where: { id }
      });

    } catch (error) {
      this.handlerExceptions(error);
    }
  }

  // Metodo para manejar las excepciones no controladas
  private handlerExceptions( error: any ) {
    if (error.code === 'P2002') {
      throw new BadRequestException(`Product with name: ${ JSON.stringify( error.keyValue ) } is exists in db.`);
    }

    throw new InternalServerErrorException(`Can't creant Product - Check Server logs`);
  }
}
