import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { adapter } from './adapter/prisma';

/**
 * Adaptador de Prisma Client
 *
 * @description Servicio que extiende la configuración del cliente de prisma
 * para poder conectarse a una base de datos libsql.
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // Constructor de la clase que llama al constructor de PrismaClient con el adaptador configurado
  constructor() {
    super({ adapter });
  }

  // Método que se ejecuta cuando el módulo se inicializa
  async onModuleInit() {
    await this.$connect();
  }

  // Método que se ejecuta cuando el módulo se destruye
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
