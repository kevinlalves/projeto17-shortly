import express, { json, Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import chalk from 'chalk';
import dotenv from 'dotenv';
import { usersRouter } from './routes/users.js';
import { urlsRouter } from './routes/urls.js';
import { authRouter } from './routes/auth.js';
dotenv.config();

const app: Application = express();
const { PORT } = process.env;

app.use(cors());
app.use(json());
app.use(helmet());

app.use('/urls', urlsRouter);
app.use('/', usersRouter);
app.use('/', authRouter);

if (process.env.NODE_ENV === 'production') {
  await import('./database/migrate.js');
}

app.listen(PORT, () => {
  console.log(chalk.green(`Server listening on port ${PORT}`));
});
