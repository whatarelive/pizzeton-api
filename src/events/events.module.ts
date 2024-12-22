import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService, PrismaService],
  imports: [AuthModule],
})
export class EventsModule {}
