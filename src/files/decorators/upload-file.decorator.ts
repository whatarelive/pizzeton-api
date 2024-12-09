import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export const UploadImage = (...args: string[]) => {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor('file', {
        fileFilter(_req, file, callback) {
          if (!file) {
            return callback(new Error('File is empty.'), false);
          }

          const fileExtension = file.mimetype.split('/')[1];

          if (args.includes(fileExtension)) {
            return callback(null, true);
          }

          return callback(null, false);
        },
        storage: diskStorage({
          destination: './static/uploads',
          filename(_req, file, callback) {
            callback(null, file.originalname);
          },
        }),
      }),
    ),
  );
};
