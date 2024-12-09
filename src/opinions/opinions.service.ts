import { randomUUID, type UUID } from 'node:crypto';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Opinion as OpinionModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateOpinionDto } from './dto/create-opinion.dto';
import { PaginationDto } from '../common/dto/paginationDto.dto';

@Injectable()
export class OpinionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: UUID,
    createOpinionDto: CreateOpinionDto,
  ): Promise<OpinionModel> {
    try {
      return await this.prisma.opinion.create({
        data: {
          id: randomUUID(),
          userId,
          ...createOpinionDto,
        },
      });
    } catch (error) {
      this.handlerError(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<OpinionModel[]> {
    const { limit = 10, offset = 0 } = paginationDto;

    const opinons = await this.prisma.opinion.findMany({
      take: limit,
      skip: offset,
    });

    if (!opinons || opinons.length === 0)
      throw new NotFoundException('Opinions not exists.');

    return opinons;
  }

  async delete(id: UUID) {
    try {
      return await this.prisma.opinion.delete({
        where: { id },
      });
    } catch (error) {
      this.handlerError(error);
    }
  }

  private handlerError(error: any): never {
    if (error.code === 'P2025') {
      throw new NotFoundException(`Opinion with not exists.`);
    }

    throw new InternalServerErrorException(
      `Can't creant Opinion - Check Server logs`,
    );
  }
}
