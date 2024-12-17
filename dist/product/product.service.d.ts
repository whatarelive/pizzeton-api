import { type UUID } from 'node:crypto';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';
export declare class ProductService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProduct: CreateProductDTO): Promise<Product>;
    findByCategory(category: string): Promise<{
        id: string;
        title: string;
        subtitle: string;
        imgUrl: string;
        imgId: string;
        category: string;
        stock: boolean;
        price: number;
    }[]>;
    findAll(paginationDto: PaginationDto): Promise<{
        id: string;
        title: string;
        subtitle: string;
        imgUrl: string;
        imgId: string;
        category: string;
        stock: boolean;
        price: number;
    }[]>;
    findById(id: UUID): Promise<Product>;
    update(id: UUID, updateProduct: UpdateProductDTO): Promise<Product>;
    delete(id: UUID): Promise<Product>;
    private handlerExceptions;
}
