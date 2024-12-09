import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { OpinionsModule } from './opinions/opinions.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    AuthModule,
    CommonModule,
    FilesModule,
    ProductModule,
    OpinionsModule,
  ],
})
export class AppModule {}
