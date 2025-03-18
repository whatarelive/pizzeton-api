import { createClient } from '@libsql/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';

// Crea una instancia del cliente libsql con la configuración proporcionada
export const libsql = createClient({
  // URL de la base de datos local
  url: 'file:./prisma/dev.db',
  // URL de sincronización de la base de datos, obtenida de las variables de entorno
  syncUrl: process.env.TURSO_DATABASE_URL,
  // Token de autenticación, obtenido de las variables de entorno
  authToken: process.env.TURSO_AUTH_TOKEN,
  // Intervalo de sincronización en milisegundos
  syncInterval: 300,
});

// Crea una instancia del adaptador PrismaLibSQL utilizando el cliente libsql
export const adapter = new PrismaLibSQL(libsql);
