import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CloudinaryProvider } from './providers/cloudinary.provider';

@Module({
  controllers: [FilesController],
  providers: [CloudinaryProvider, FilesService],
})
export class FilesModule {}
