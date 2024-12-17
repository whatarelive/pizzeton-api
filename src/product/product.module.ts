import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ProminentsModule } from './prominents/prominents.module';
import { AgregationsModule } from './agregations/agregations.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
  imports: [AuthModule, ProminentsModule, AgregationsModule],
})
export class ProductModule {}
