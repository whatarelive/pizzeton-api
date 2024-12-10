import { randomUUID, type UUID } from 'crypto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEspecialityDto, UpdateEspecialityDto } from './dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EspecialityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEspecialityDto: CreateEspecialityDto) {
    try {
      const { id, description } = createEspecialityDto;

      return await this.prisma.especiality.create({
        data: {
          id: randomUUID(),
          description,
          product: {
            connect: { id },
          },
        },
      });
    } catch (error) {
      this.handlerError(error);
    }
  }

  async findAll() {
    const especialities = await this.prisma.especiality.findMany();

    if (!especialities || especialities.length === 0) {
      throw new NotFoundException();
    }

    return especialities;
  }

  async update(id: UUID, updateEspecialityDto: UpdateEspecialityDto) {
    try {
      const { description } = updateEspecialityDto;

      return await this.prisma.especiality.update({
        where: { id },
        data: {
          description,
          product: {
            connect: { id: updateEspecialityDto.id },
          },
        },
      });
    } catch (error) {
      this.handlerError(error);
    }
  }

  async remove(id: UUID) {
    try {
      return await this.prisma.especiality.delete({
        where: { id },
      });
    } catch (error) {
      this.handlerError(error);
    }
  }

  private handlerError(error: any) {
    if (error.code === 'P2002') {
      throw new BadRequestException(
        `Especiality with ${error.meta.target} is exists.`,
      );
    }

    if (error.code === 'P2025') {
      throw new NotFoundException(`Especiality not exists.`);
    }

    throw new InternalServerErrorException(
      `Can't creant Product - Check Server logs`,
    );
  }
}
