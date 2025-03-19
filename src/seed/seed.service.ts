import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { productsSeed } from 'src/seed/data/products';
import { aggregationsSeed } from 'src/seed/data/agregations';
import { eventsSeed } from 'src/seed/data/events';
import { prominentsSeed } from 'src/seed/data/prominents';

/**
 * Servicio para la gestión del seed de la Base de datos
 *
 * @description Proporciona funcionalidades para crear y eliminar los datos
 */
@Injectable()
export class SeedService {
  // Inyección de dependencias
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Realiza la operación de seed
   * @returns Mensaje de confirmación
   */
  async run() {
    // Elimina todos los datos de las tablas
    await this.prisma.prominent.deleteMany();
    await this.prisma.product.deleteMany();
    await this.prisma.agregations.deleteMany();
    await this.prisma.event.deleteMany();

    // Se ingresan todos los datos
    await this.insertNewProducts();
    await this.insertNewProminentProduct();
    await this.insertNewAgregations();
    await this.insertNewEvents();

    return `Seed executed`;
  }

  // Ingresan los datos en la tabla de productos
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

  // Ingresan los datos en la tabla de productos destacados
  private async insertNewProminentProduct() {
    for (const product of prominentsSeed) {
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

  // Ingresan los datos en la tabla de agregos para los productos
  private async insertNewAgregations() {
    for (const agregation of aggregationsSeed) {
      await this.prisma.agregations.create({
        data: {
          id: randomUUID(),
          ...agregation,
        },
      });
    }
  }

  // Ingresan los datos en la tabla de eventos
  private async insertNewEvents() {
    for (const event of eventsSeed) {
      await this.prisma.event.create({
        data: {
          id: randomUUID(),
          imgId: 'event',
          ...event,
        },
      });
    }
  }
}
