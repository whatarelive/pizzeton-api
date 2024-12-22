import { randomUUID, type UUID } from 'crypto';
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAgregationDto } from './dto/create-agregation.dto';
import { UpdateAgregationDto } from './dto/update-agregation.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AgregationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAgregationDto: CreateAgregationDto) {
    try {
      return await this.prisma.agregations.create({
        data: {
          id: randomUUID(),
          ...createAgregationDto,
        },
      });
    } catch (error) {
      this.handlerExceptions(error, createAgregationDto.title);
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
      this.handlerExceptions(error);
    }
  }

  async remove(id: UUID) {
    try {
      return await this.prisma.agregations.delete({
        where: { id },
      });
    } catch (error) {
      this.handlerExceptions(error);
    }
  }

  // Método para manejar las excepciones no controladas
  private handlerExceptions(error: any, value?: any): never {
    if (error.code === 'P2002') {
      throw new BadRequestException(
        `Agregation with ${error.meta.target}: ${value} is exists.`,
      );
    }

    if (error.code === 'P2025') {
      throw new NotFoundException(`Agregation with id: ${value} not exists.`);
    }

    throw new InternalServerErrorException(
      `Can't creant Agregation - Check Server logs`,
    );
  }
}
