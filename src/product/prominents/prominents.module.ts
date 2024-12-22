import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ProminentsService } from './prominents.service';
import { ProminentsController } from './prominents.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ProminentsController],
  providers: [ProminentsService],
  imports: [AuthModule, PrismaModule],
})
export class ProminentsModule {}
