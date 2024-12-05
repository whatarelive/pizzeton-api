import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OpinionsService } from './opinions.service';
import { OpinionsController } from './opinions.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [OpinionsController],
  providers: [OpinionsService, PrismaService],
  imports: [AuthModule],
})
export class OpinionsModule {}
