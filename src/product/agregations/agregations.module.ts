import { Module } from '@nestjs/common';
import { AgregationsService } from './agregations.service';
import { AgregationsController } from './agregations.controller';
import { PrismaService } from '../../prisma.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [AgregationsController],
  providers: [PrismaService, AgregationsService],
  imports: [AuthService],
})
export class AgregationsModule {}
