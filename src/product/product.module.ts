import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { AgregationsModule } from 'src/product/agregations/agregations.module';
import { ProminentsModule } from 'src/product/prominents/prominents.module';
import { ProductController } from 'src/product/product.controller';
import { ProductService } from 'src/product/product.service';

/**
 * Módulo de Productos
 *
 * @description Este módulo maneja toda la funcionalidad relacionada con productos en la aplicación.
 * Gestiona la creación, consulta, actualización y eliminación de productos.
 */
@Module({
  controllers: [ProductController], // Controlador que maneja las rutas de productos
  providers: [ProductService], // Servicio que implementa la lógica de negocio para productos
  imports: [
    AuthModule, // Para autenticación y autorización
    ProminentsModule, // Para manejo de productos destacados
    AgregationsModule, // Para manejo de agregos a determinados productos
    PrismaModule, // Para acceso a la base de datos
    CommonModule, // Para funcionalidad compartida
    FilesModule, // Para operaciones de manejo de archivos
  ],
})
export class ProductModule {}
