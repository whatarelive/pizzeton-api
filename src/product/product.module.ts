import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ProminentsModule } from './prominents/prominents.module';
import { AgregationsModule } from './agregations/agregations.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    AuthModule,
    ProminentsModule,
    AgregationsModule,
    PrismaModule,
    CommonModule,
  ],
})
export class ProductModule {}
