import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { OpinionsController } from './opinions.controller';
import { OpinionsService } from './opinions.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [OpinionsController],
  providers: [OpinionsService, PrismaService],
  imports: [AuthModule],
})
export class OpinionsModule {}
