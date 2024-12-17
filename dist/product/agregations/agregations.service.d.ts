import { type UUID } from 'crypto';
import { CreateAgregationDto } from './dto/create-agregation.dto';
import { UpdateAgregationDto } from './dto/update-agregation.dto';
import { PrismaService } from 'src/prisma.service';
export declare class AgregationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createAgregationDto: CreateAgregationDto): Promise<{
        id: string;
        title: string;
        price: number;
    }>;
    findAll(): Promise<{
        id: string;
        title: string;
        price: number;
    }[]>;
    update(id: UUID, updateAgregationDto: UpdateAgregationDto): Promise<{
        id: string;
        title: string;
        price: number;
    }>;
    remove(id: UUID): Promise<{
        id: string;
        title: string;
        price: number;
    }>;
    private handlerExceptions;
}
