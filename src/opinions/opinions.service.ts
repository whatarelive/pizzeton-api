import { randomUUID, type UUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { Opinion as OpinionModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateOpinionDto } from './dto/create-opinion.dto';

@Injectable()
export class OpinionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOpinion: CreateOpinionDto): Promise<OpinionModel> {
    try {
      const { userId, ...restData } = createOpinion;

      return await this.prisma.opinion.create({
        data: {
          id: randomUUID(),
          user: { connect: { id: userId } },
          ...restData,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<OpinionModel[]> {
    return this.prisma.opinion.findMany();
  }

  async delete(id: UUID) {
    return this.prisma.opinion.delete({
      where: { id },
    });
  }
}
