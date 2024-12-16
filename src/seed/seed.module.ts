import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { PrismaService } from 'src/prisma.service';
import { SeedController } from './seed.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService, PrismaService],
  imports: [AuthModule],
})
export class SeedModule {}
