export declare class FilesService {
    uploadImage(file: Express.Multer.File): Promise<{
        secure_url: string;
        public_id: string;
    }>;
    updateImage(id: string, file: Express.Multer.File): Promise<{
        secure_url: string;
        public_id: string;
    }>;
    deleteImage(id: string): Promise<any>;
}
