import type { UUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { CreateAgregationDto } from './dto/create-agregation.dto';
import { UpdateAgregationDto } from './dto/update-agregation.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AgregationsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createAgregationDto: CreateAgregationDto) {
    return 'This action adds a new agregation';
  }

  findAll() {
    return `This action returns all agregations`;
  }

  update(id: UUID, updateAgregationDto: UpdateAgregationDto) {
    return `This action updates a #${id} agregation`;
  }

  remove(id: UUID) {
    return `This action removes a #${id} agregation`;
  }
}
