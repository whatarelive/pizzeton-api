import { randomUUID, type UUID } from 'node:crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProminentDto } from './dto/create-prominent.dto';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';
import { ErrorHandler } from 'src/common/helpers/ErrorsHandler';

@Injectable()
export class ProminentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly errorHandler: ErrorHandler,
  ) {}

  async create(createProminentDto: CreateProminentDto) {
    try {
      const { productId } = createProminentDto;

      return await this.prisma.prominent.create({
        data: {
          id: randomUUID(),
          product: {
            connect: { id: productId },
          },
        },
      });
    } catch (error) {
      this.errorHandler.purge(error, 'Prominent Product');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const prominents = await this.prisma.prominent.findMany({
      take: limit,
      skip: offset,
      select: {
        id: true,
        product: {
          select: {
            title: true,
            subtitle: true,
            imgUrl: true,
            price: true,
          },
        },
      },
    });

    if (!prominents || prominents.length === 0) {
      throw new NotFoundException('Prominents Products not exists.');
    }

    return prominents;
  }

  async remove(id: UUID) {
    try {
      return await this.prisma.prominent.delete({
        where: { id },
      });
    } catch (error) {
      this.errorHandler.purge(error, 'Prominent Product');
    }
  }
}
