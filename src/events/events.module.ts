import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [AuthModule, PrismaModule, CommonModule],
})
export class EventsModule {}
