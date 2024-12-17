import { type UUID } from 'node:crypto';
import { Opinion as OpinionModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateOpinionDto } from './dto/create-opinion.dto';
import { PaginationDto } from '../common/dto/paginationDto.dto';
export declare class OpinionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: UUID, createOpinionDto: CreateOpinionDto): Promise<OpinionModel>;
    findAll(paginationDto: PaginationDto): Promise<OpinionModel[]>;
    findById(id: UUID, paginationDto: PaginationDto): Promise<OpinionModel[]>;
    delete(id: UUID): Promise<{
        opinion: string;
        id: string;
        date: Date;
        valoration: number;
        userId: string;
    }>;
    private handlerError;
}
