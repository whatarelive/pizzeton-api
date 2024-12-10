import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from 'src/prisma.service';
import { EspecialityModule } from './especiality/especiality.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
  imports: [AuthModule, EspecialityModule],
})
export class ProductModule {}
