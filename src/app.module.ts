import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { OpinionsModule } from './opinions/opinions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductModule, OpinionsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
