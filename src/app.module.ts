import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { OpinionsModule } from './opinions/opinions.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [ProductModule, OpinionsModule, AuthModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
