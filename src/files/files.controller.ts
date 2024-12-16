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
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid_roles';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('image')
  @Auth(ValidRoles.admin)
  @UploadImage(ValidFiles.jpeg, ValidFiles.jpg, ValidFiles.png)
  async createImage(@UploadedFile() file: Express.Multer.File) {
    return await this.filesService.uploadImage(file);
  }

  @Patch('image/:id')
  @Auth(ValidRoles.admin)
  @UploadImage(ValidFiles.jpeg, ValidFiles.jpg, ValidFiles.png)
  async updateImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.filesService.updateImage(id, file);
  }

  @Delete('image/:id')
  @Auth(ValidRoles.admin)
  async deleteImage(@Param('id') id: string) {
    return await this.filesService.deleteImage(id);
  }
}
