import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';
import { ProminentsService } from './prominents.service';
import { ProminentsController } from './prominents.controller';

@Module({
  controllers: [ProminentsController],
  providers: [ProminentsService, PrismaService],
  imports: [AuthModule],
})
export class ProminentsModule {}
