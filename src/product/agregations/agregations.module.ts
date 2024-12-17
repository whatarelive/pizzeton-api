import { Module } from '@nestjs/common';
import { AgregationsService } from './agregations.service';
import { AgregationsController } from './agregations.controller';
import { PrismaService } from '../../prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [AgregationsController],
  providers: [PrismaService, AgregationsService],
  imports: [AuthModule],
})
export class AgregationsModule {}
