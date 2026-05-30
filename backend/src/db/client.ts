

import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema.js';

const { Pool } = pg;

export interface DatabaseClientOptions {
  connectionString: string;
  maxConnections?: number;
}

export function createDatabaseClient(options: DatabaseClientOptions) {
  const pool = new Pool({
    connectionString: options.connectionString,
    max: options.maxConnections ?? 10,
  });

  return drizzle(pool, { schema });
}

export type DatabaseClient = ReturnType<typeof createDatabaseClient>;
