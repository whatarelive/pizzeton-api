import { randomUUID, type UUID } from 'crypto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    try {
      return await this.prisma.event.create({
        data: {
          id: randomUUID(),
          ...createEventDto,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    const events = await this.prisma.event.findMany({
      where: { active: true },
      orderBy: { title: 'desc' },
    });

    if (!events || events.length === 0)
      throw new NotFoundException('Events not exists.');

    return events;
  }

  async update(id: UUID, updateEventDto: UpdateEventDto) {
    try {
      return await this.prisma.event.update({
        where: { id },
        data: {
          ...updateEventDto,
        },
      });
    } catch (error) {
      this.handlerExceptions(error);
    }
  }

  async remove(id: UUID) {
    try {
      return await this.prisma.event.delete({
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
        `Event with ${error.meta.target}: ${value} is exists.`,
      );
    }

    if (error.code === 'P2025') {
      throw new NotFoundException(`Event with id: ${value} not exists.`);
    }

    throw new InternalServerErrorException(
      `Can't creant Event - Check Server logs`,
    );
  }
}
