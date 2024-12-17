import type { UUID } from 'crypto';
import { AgregationsService } from './agregations.service';
import { CreateAgregationDto } from './dto/create-agregation.dto';
import { UpdateAgregationDto } from './dto/update-agregation.dto';
export declare class AgregationsController {
    private readonly agregationsService;
    constructor(agregationsService: AgregationsService);
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
}
