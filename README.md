<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Pizzeton API

## Descripción

Pizzeton API es una aplicación desarrollada con [NestJS](https://nestjs.com/) que proporciona funcionalidades para la gestión de productos, opiniones, eventos y autenticación de usuarios.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

- **src/**: Contiene el código fuente de la aplicación.
  - **auth/**: Módulo de autenticación y autorización.
  - **common/**: Módulo con funcionalidades comunes.
  - **events/**: Módulo para la gestión de eventos.
  - **files/**: Módulo para la gestión de archivos.
  - **opinions/**: Módulo para la gestión de opiniones.
  - **prisma/**: Configuración y servicios de Prisma ORM.
  - **product/**: Módulo para la gestión de productos.
  - **seed/**: Módulo para el llenado inicial de la base de datos.
  - **app.module.ts**: Módulo principal de la aplicación.
  - **main.ts**: Punto de entrada de la aplicación.

## Configuración del Proyecto

### Requisitos Previos

- Node.js (v14 o superior)
- npm (v6 o superior)

### Instalación

```bash
$ npm install
```

### Compilar y Ejecutar el Proyecto

```bash
# desarrollo
$ npm run start

# modo watch
$ npm run start:dev

# producción
$ npm run start:prod
```

### Ejecutar Pruebas

```bash
# pruebas unitarias
$ npm run test

# pruebas end-to-end
$ npm run test:e2e

# cobertura de pruebas
$ npm run test:cov
```

## Uso de la API

### Autenticación

- **Registro de Usuario**: `POST /auth/register`
- **Inicio de Sesión**: `POST /auth/login`
- **Generar Nuevo Token**: `GET /auth/token`

### Productos

- **Crear Producto**: `POST /products`
- **Obtener Productos**: `GET /products`
- **Actualizar Producto**: `PATCH /products/:id`
- **Eliminar Producto**: `DELETE /products/:id`

### Opiniones

- **Crear Opinión**: `POST /opinions`
- **Obtener Opiniones**: `GET /opinions`
- **Eliminar Opinión**: `DELETE /opinions/:id`

### Eventos

- **Crear Evento**: `POST /events`
- **Obtener Eventos**: `GET /events`
- **Actualizar Evento**: `PATCH /events/:id`
- **Eliminar Evento**: `DELETE /events/:id`

### Seed de la Base de Datos

- **Inicializar Seed**: `GET /seed`

## Contribuir

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.