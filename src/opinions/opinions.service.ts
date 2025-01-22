import { randomUUID, type UUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOpinionDto } from './dto/create-opinion.dto';
import { PaginationDto } from '../common/dto/paginationDto.dto';
import { ErrorHandler } from 'src/common/helpers/ErrorsHandler';

@Injectable()
export class OpinionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly errorHandler: ErrorHandler,
  ) {}

  async create(createOpinionDto: CreateOpinionDto) {
    try {
      return await this.prisma.opinion.create({
        data: {
          id: randomUUID(),
          ...createOpinionDto,
        },
      });
    } catch (error) {
      this.errorHandler.purge(error, 'Opinions');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return await this.prisma.opinion.findMany({
      orderBy: { date: 'asc' },
      take: limit,
      skip: offset,
    });
  }

  async delete(id: UUID) {
    try {
      return await this.prisma.opinion.delete({
        where: { id },
      });
    } catch (error) {
      this.errorHandler.purge(error, 'Opinions');
    }
  }
}
