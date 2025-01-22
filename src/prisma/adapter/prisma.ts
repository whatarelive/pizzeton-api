import { createClient } from '@libsql/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';

export const libsql = createClient({
  url: 'file:./prisma/dev.db',
  syncUrl: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
  syncInterval: 300,
});

export const adapter = new PrismaLibSQL(libsql);
