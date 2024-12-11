import {
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { UploadImage } from './decorators/upload-file.decorator';
import { ValidFiles } from './interfaces/valid_files';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('image')
  @UploadImage(ValidFiles.jpeg, ValidFiles.jpg, ValidFiles.png)
  async createImage(@UploadedFile() file: Express.Multer.File) {
    return await this.filesService.uploadImage(file);
  }

  @Patch('image/:id')
  @UploadImage(ValidFiles.jpeg, ValidFiles.jpg, ValidFiles.png)
  async updateImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.filesService.updateImage(id, file);
  }

  @Delete('image/:id')
  async deleteImage(@Param('id') id: string) {
    return await this.filesService.deleteImage(id);
  }
}
