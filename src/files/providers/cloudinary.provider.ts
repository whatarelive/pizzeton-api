import { Provider } from '@nestjs/common';
import { v2 as CloudinaryAPI } from 'cloudinary';

export const CloudinaryProvider: Provider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return CloudinaryAPI.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
};
