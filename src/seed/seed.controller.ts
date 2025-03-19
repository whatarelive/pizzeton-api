import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SeedService } from 'src/seed/seed.service';

/**
 * Controlador que maneja todas las operaciones relacionadas seed de la BD
 *
 * @description Gestiona las operaciones creado y eliminación de todos los datos
 * dentro de la Base de datos
 */
@Controller('seed')
export class SeedController {
  // Se inyecta el servicio que maneja la lógica de negocio
  constructor(private readonly seedService: SeedService) {}

  // Realiza la operación de seed de la Base de Datos
  @Get()
  @UseGuards(AuthGuard())
  initSeed() {
    return this.seedService.run();
  }
}
