import {
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesService } from './files.service';
import { UploadImage } from './decorators/upload-file.decorator';
import { ValidFiles } from './interfaces/valid_files';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('image')
  @UseGuards(AuthGuard())
  @UploadImage(ValidFiles.jpeg, ValidFiles.jpg, ValidFiles.png)
  async createImage(@UploadedFile() file: Express.Multer.File) {
    return await this.filesService.uploadImage(file);
  }

  @Patch('image/:id')
  @UseGuards(AuthGuard())
  @UploadImage(ValidFiles.jpeg, ValidFiles.jpg, ValidFiles.png)
  async updateImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.filesService.updateImage(id, file);
  }

  @Delete('image/:id')
  @UseGuards(AuthGuard())
  async deleteImage(@Param('id') id: string) {
    return await this.filesService.deleteImage(id);
  }
}
