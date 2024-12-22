import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { OpinionsModule } from './opinions/opinions.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { FilesModule } from './files/files.module';
import { SeedModule } from './seed/seed.module';
import { EventsModule } from './events/events.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    AuthModule,
    CommonModule,
    FilesModule,
    ProductModule,
    OpinionsModule,
    EventsModule,
    SeedModule,
    PrismaModule,
  ],
})
export class AppModule {}
