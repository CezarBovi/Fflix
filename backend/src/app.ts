import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { StatusCodes } from 'http-status-codes';
import { apiRouter } from './routes';
import { logger } from './shared/utils/logger';

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(express.json({ limit: '10mb' }));

  app.get('/health', (_req, res) => {
    res.status(StatusCodes.OK).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use('/api', apiRouter);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    logger.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  });

  return app;
};

