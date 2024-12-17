import { type UUID } from 'node:crypto';
import { PrismaService } from 'src/prisma.service';
import { CreateProminentDto } from './dto/create-prominent.dto';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';
export declare class ProminentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProminentDto: CreateProminentDto): Promise<{
        id: string;
        productId: string;
    }>;
    findAll(paginationDto: PaginationDto): Promise<{
        product: {
            title: string;
            subtitle: string;
            imgUrl: string;
            price: number;
        };
        id: string;
    }[]>;
    remove(id: UUID): Promise<{
        id: string;
        productId: string;
    }>;
    private handlerError;
}
