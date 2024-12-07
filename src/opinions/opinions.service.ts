import { randomUUID, type UUID } from 'node:crypto';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Opinion as OpinionModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateOpinionDto } from './dto/create-opinion.dto';

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

  async findAll(): Promise<OpinionModel[]> {
    const opinons = this.prisma.opinion.findMany();

    if (!opinons) throw new NotFoundException('Opinions not exists.');

    return opinons;
  }

  async delete(id: UUID) {
    try {
      return this.prisma.opinion.delete({
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
