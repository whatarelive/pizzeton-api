"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadImage = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const UploadImage = (...args) => {
    return (0, common_1.applyDecorators)((0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
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
        storage: (0, multer_1.diskStorage)({
            destination: './static/uploads',
            filename(_req, file, callback) {
                callback(null, file.originalname);
            },
        }),
    })));
};
exports.UploadImage = UploadImage;
//# sourceMappingURL=upload-file.decorator.js.map