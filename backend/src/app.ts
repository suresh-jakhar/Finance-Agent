import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import healthRouter from './routes/health.router.js';
import { logger } from './utils/logger.js';
import type { DatabaseClient } from './db/index.js';

export interface AppConfig {
  corsOrigins: string[];
  db?: DatabaseClient;
}

export function createApp(config: AppConfig): Application {
  const app = express();

  app.use(
    cors({
      origin: config.corsOrigins,
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use((req: Request, _res: Response, next: NextFunction): void => {
    logger.info(`→ ${req.method} ${req.path}`);
    next();
  });

  app.use('/api/health', healthRouter);

  return app;
}
