import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { healthRouter } from './routes/health';
import { itemsRouter } from './routes/items';
import { authRouter } from './auth/auth';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/health', healthRouter);
app.use('/items', itemsRouter);
app.use('/auth', authRouter);

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${PORT}`);
  });
}

export { app };

