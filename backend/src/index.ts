/**
 * index.ts — Server entry point
 *
 * Single Responsibility: start the HTTP server and handle graceful shutdown.
 *   All application composition happens in app.ts.
 *   All environment parsing will move to config.ts in A3.
 *
 * For A1/A2, we read the minimum env vars needed to start the server
 * and connect to the database. Full Zod-validated config is A3's scope.
 */

import 'dotenv/config';
import { createApp } from './app.js';
import { createDatabaseClient } from './db/index.js';
import { logger } from './utils/logger.js';

// ─── Minimal env reading (validated config is Phase A3) ─────────────────────
const PORT = parseInt(process.env['PORT'] ?? '3001', 10);
const NODE_ENV = process.env['NODE_ENV'] ?? 'development';
const CORS_ORIGINS = (process.env['CORS_ORIGINS'] ?? 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim());

const DATABASE_URL = process.env['DATABASE_URL'];

// ─── Database ────────────────────────────────────────────────────────────────
// Create the DB client only if DATABASE_URL is present.
// The app can still start without a DB for phases that don't need it yet,
// but any route that touches the DB will fail fast with a clear error.
const db = DATABASE_URL
  ? createDatabaseClient({ connectionString: DATABASE_URL })
  : undefined;

if (db) {
  logger.info('Database client initialised.');
} else {
  logger.warn(
    'DATABASE_URL not set — database features unavailable. ' +
      'Set DATABASE_URL in .env to enable them.'
  );
}

// ─── Bootstrap ───────────────────────────────────────────────────────────────
const app = createApp({ corsOrigins: CORS_ORIGINS, db });

const server = app.listen(PORT, () => {
  logger.info(`CreditOps backend running on port ${PORT} [${NODE_ENV}]`);
  logger.info(`Health → http://localhost:${PORT}/api/health`);
});

// ─── Graceful Shutdown ───────────────────────────────────────────────────────
function shutdown(signal: string): void {
  logger.info(`Received ${signal}. Shutting down gracefully…`);
  server.close(() => {
    logger.info('Server closed.');
    process.exit(0);
  });

  // Force exit if server hasn't closed within 10 s
  setTimeout(() => {
    logger.error('Forced shutdown after timeout.');
    process.exit(1);
  }, 10_000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

