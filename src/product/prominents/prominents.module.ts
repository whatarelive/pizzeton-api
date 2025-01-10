import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ProminentsService } from './prominents.service';
import { ProminentsController } from './prominents.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [ProminentsController],
  providers: [ProminentsService],
  imports: [AuthModule, PrismaModule, CommonModule],
})
export class ProminentsModule {}
