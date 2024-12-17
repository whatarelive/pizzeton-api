import type { UUID } from 'node:crypto';
import { ProminentsService } from './prominents.service';
import { CreateProminentDto } from './dto/create-prominent.dto';
import { PaginationDto } from '../../common/dto/paginationDto.dto';
export declare class ProminentsController {
    private readonly prominentsService;
    constructor(prominentsService: ProminentsService);
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
}
