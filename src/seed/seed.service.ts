import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { productsSeed } from './data/products';
import { aggregationsSeed } from './data/agregations';

@Injectable()
export class SeedService {
  constructor(private readonly prisma: PrismaService) {}

  async run() {
    await this.prisma.prominent.deleteMany();
    await this.prisma.product.deleteMany();

    await this.insertNewProducts();
    await this.insertNewProminentProduct();
    await this.insertNewAgregations();

    return `Seed executed`;
  }

  private async insertNewProducts() {
    for (const product of productsSeed) {
      await this.prisma.product.create({
        data: {
          id: randomUUID(),
          ...product,
        },
      });
    }
  }

  private async insertNewProminentProduct() {
    for (const product of productsSeed.slice(3, 7)) {
      await this.prisma.prominent.create({
        data: {
          id: randomUUID(),
          product: {
            connect: {
              title: product.title,
            },
          },
        },
      });
    }
  }

  private async insertNewAgregations() {
    await this.prisma.agregations.deleteMany();

    for (const agregation of aggregationsSeed) {
      await this.prisma.agregations.create({
        data: {
          id: randomUUID(),
          ...agregation,
        },
      });
    }
  }
}
