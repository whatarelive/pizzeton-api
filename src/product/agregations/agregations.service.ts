import { randomUUID, type UUID } from 'crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgregationDto } from './dto/create-agregation.dto';
import { UpdateAgregationDto } from './dto/update-agregation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorHandler } from 'src/common/helpers/ErrorsHandler';

@Injectable()
export class AgregationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly errorHandler: ErrorHandler,
  ) {}

  async create(createAgregationDto: CreateAgregationDto) {
    try {
      return await this.prisma.agregations.create({
        data: {
          id: randomUUID(),
          ...createAgregationDto,
        },
      });
    } catch (error) {
      this.errorHandler.purge(error, 'Agregations');
    }
  }

  async findAll() {
    const agregations = await this.prisma.agregations.findMany();

    if (!agregations || agregations.length === 0)
      throw new NotFoundException('Agregations not exists.');

    return agregations;
  }

  async update(id: UUID, updateAgregationDto: UpdateAgregationDto) {
    try {
      return await this.prisma.agregations.update({
        where: { id },
        data: {
          ...updateAgregationDto,
        },
      });
    } catch (error) {
      this.errorHandler.purge(error, 'Agregations');
    }
  }

  async remove(id: UUID) {
    try {
      return await this.prisma.agregations.delete({
        where: { id },
      });
    } catch (error) {
      this.errorHandler.purge(error, 'Agregations');
    }
  }
}
