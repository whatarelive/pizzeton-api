import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { productsSeed } from './data/products';
import { randomUUID } from 'crypto';

@Injectable()
export class SeedService {
  constructor(private readonly prisma: PrismaService) {}

  async run() {
    await this.prisma.prominent.deleteMany();
    await this.prisma.product.deleteMany();

    await this.insertNewProducts();
    await this.insertNewProminentProduct();

    return `Seed executed`;
  }

  async insertNewProducts() {
    for (const product of productsSeed) {
      await this.prisma.product.create({
        data: {
          id: randomUUID(),
          ...product,
        },
      });
    }
  }

  async insertNewProminentProduct() {
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
}
