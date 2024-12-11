import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { EspecialityService } from './especiality.service';
import { EspecialityController } from './especiality.controller';

@Module({
  controllers: [EspecialityController],
  providers: [EspecialityService, PrismaService],
})
export class EspecialityModule {}
