import { randomUUID, type UUID } from 'node:crypto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProminentDto } from './dto/create-prominent.dto';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProminentsService {
  constructor(private readonly prisma: PrismaService) {}

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
      this.handlerError(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const prominents = await this.prisma.prominent.findMany({
      take: limit,
      skip: offset,
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
      this.handlerError(error);
    }
  }

  private handlerError(error: any) {
    if (error.code === 'P2002') {
      throw new BadRequestException(
        `Prominent Product with ${error.meta.target} is exists.`,
      );
    }

    if (error.code === 'P2025') {
      throw new NotFoundException(`Prominent Product not exists.`);
    }

    throw new InternalServerErrorException(
      `Can't creant Product - Check Server logs`,
    );
  }
}
