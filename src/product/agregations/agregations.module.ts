import { Module } from '@nestjs/common';
import { AgregationsService } from './agregations.service';
import { AgregationsController } from './agregations.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [AgregationsController],
  providers: [AgregationsService],
  imports: [AuthModule, PrismaModule, CommonModule],
})
export class AgregationsModule {}
