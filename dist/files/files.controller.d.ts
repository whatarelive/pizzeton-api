import { FilesService } from './files.service';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    createImage(file: Express.Multer.File): Promise<{
        secure_url: string;
        public_id: string;
    }>;
    updateImage(id: string, file: Express.Multer.File): Promise<{
        secure_url: string;
        public_id: string;
    }>;
    deleteImage(id: string): Promise<any>;
}
