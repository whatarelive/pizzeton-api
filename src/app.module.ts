import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { OpinionsModule } from './opinions/opinions.module';

@Module({
  imports: [ProductModule, OpinionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
