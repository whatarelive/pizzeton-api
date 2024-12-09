import { Injectable } from '@nestjs/common';
import { v2 as cloudinaryAPI } from 'cloudinary';
import { unlink } from 'node:fs/promises';

@Injectable()
export class FilesService {
  async uploadImage(file: Express.Multer.File) {
    const tempPath = `./static/uploads/${file.originalname}`;

    const { secure_url, public_id } =
      await cloudinaryAPI.uploader.upload(tempPath);

    await unlink(tempPath);

    return { secure_url, public_id };
  }
}
