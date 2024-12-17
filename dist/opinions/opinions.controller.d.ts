import type { UUID } from 'node:crypto';
import { Opinion as OpinionModel } from '@prisma/client';
import { OpinionsService } from './opinions.service';
import { CreateOpinionDto } from './dto/create-opinion.dto';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';
export declare class OpinionsController {
    private readonly opinionsService;
    constructor(opinionsService: OpinionsService);
    create(createOpinionDto: CreateOpinionDto, userId: UUID): Promise<OpinionModel>;
    findAll(paginationDto: PaginationDto): Promise<OpinionModel[]>;
    findById(id: UUID, paginationDto: PaginationDto): Promise<{
        opinion: string;
        id: string;
        date: Date;
        valoration: number;
        userId: string;
    }[]>;
    remove(id: UUID): Promise<OpinionModel>;
}
