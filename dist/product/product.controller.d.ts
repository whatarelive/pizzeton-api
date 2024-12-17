import type { UUID } from 'node:crypto';
import { Product as ProductModel } from '@prisma/client';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProduct: CreateProductDTO): Promise<ProductModel>;
    findAll(paginationDto: PaginationDto): Promise<ProductModel[]>;
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
    findById(id: UUID): Promise<ProductModel>;
    update(id: UUID, updateProduct: UpdateProductDTO): Promise<ProductModel>;
    delete(id: UUID): Promise<ProductModel>;
}
