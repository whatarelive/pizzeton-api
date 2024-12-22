import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { OpinionsController } from './opinions.controller';
import { OpinionsService } from './opinions.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [OpinionsController],
  providers: [OpinionsService],
  imports: [AuthModule, PrismaModule],
})
export class OpinionsModule {}
