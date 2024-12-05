import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OpinionsService } from './opinions.service';
import { OpinionsController } from './opinions.controller';

@Module({
  controllers: [OpinionsController],
  providers: [OpinionsService, PrismaService],
})
export class OpinionsModule {}
