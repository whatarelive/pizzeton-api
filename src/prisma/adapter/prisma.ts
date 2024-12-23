import { createClient } from '@libsql/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';

export const libsql = createClient({
  url: process.env.DATABASE_URL!,
  syncUrl: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
  syncInterval: 60,
});

export const adapter = new PrismaLibSQL(libsql);
