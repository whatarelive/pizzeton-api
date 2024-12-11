import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProminentsService } from './prominents.service';
import { ProminentsController } from './prominents.controller';

@Module({
  controllers: [ProminentsController],
  providers: [ProminentsService, PrismaService],
})
export class ProminentsModule {}
