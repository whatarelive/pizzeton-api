import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CloudinaryProvider } from './providers/cloudinary.provider';

@Module({
  controllers: [FilesController],
  providers: [CloudinaryProvider, FilesService],
  imports: [AuthModule],
})
export class FilesModule {}
