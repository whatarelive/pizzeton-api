import { randomUUID, type UUID } from 'node:crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(userId: UUID, createOpinionDto: CreateOpinionDto) {
    try {
      return await this.prisma.opinion.create({
        data: {
          id: randomUUID(),
          userId,
          ...createOpinionDto,
        },
      });
    } catch (error) {
      this.errorHandler.purge(error, 'Opinions');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const opinons = await this.prisma.opinion.findMany({
      select: {
        valoration: true,
        opinion: true,
        date: true,
        user: { select: { name: true } },
      },
      orderBy: { date: 'asc' },
      take: limit,
      skip: offset,
    });

    if (!opinons || opinons.length === 0)
      throw new NotFoundException('Opinions not exists.');

    return opinons;
  }

  async findById(id: UUID, paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const opinions = await this.prisma.opinion.findMany({
      where: {
        userId: { equals: id },
      },
      take: limit,
      skip: offset,
    });

    if (!opinions || opinions.length === 0)
      throw new NotFoundException('Opinions not exists.');

    return opinions;
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
