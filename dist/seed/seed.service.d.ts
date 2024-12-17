import { PrismaService } from 'src/prisma.service';
export declare class SeedService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    run(): Promise<string>;
    private insertNewProducts;
    private insertNewProminentProduct;
    private insertNewAgregations;
}
