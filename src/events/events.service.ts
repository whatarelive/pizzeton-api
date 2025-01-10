import { randomUUID, type UUID } from 'crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorHandler } from 'src/common/helpers/ErrorsHandler';

@Injectable()
export class EventsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly errorHandler: ErrorHandler,
  ) {}

  async create(createEventDto: CreateEventDto) {
    try {
      return await this.prisma.event.create({
        data: {
          id: randomUUID(),
          ...createEventDto,
        },
      });
    } catch (error) {
      this.errorHandler.purge(error, 'Event');
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
      this.errorHandler.purge(error, 'Event');
    }
  }

  async remove(id: UUID) {
    try {
      return await this.prisma.event.delete({
        where: { id },
      });
    } catch (error) {
      this.errorHandler.purge(error, 'Event');
    }
  }
}
