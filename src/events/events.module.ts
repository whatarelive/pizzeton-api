import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [AuthModule, PrismaModule],
})
export class EventsModule {}
