import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { errors } from 'celebrate';
import auth from './middlewares/auth.js';
import errorMiddleware from './middlewares/error.js';
import userRouter from './routes/users.js';
import cardRouter from './routes/cards.js';
import NotFoundError from './utils/errors/NotFoundError.js';
import { PORT } from './env.config.js';
import {
  login,
  createUser,
} from './controllers/users.js';
import {
  validateLogin,
  validateRegister,
} from './utils/validators/userValidator.js';

const app = express();
app.use(helmet());
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(auth);
app.post('/signup', validateRegister, createUser);
app.post('/signin', validateLogin, login);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', () => {
  throw new NotFoundError('Запрашиваемый URL не найден');
});
app.use(errors());
app.use(errorMiddleware);

app.listen(PORT, () => { console.log(`server running on port:${PORT}`); });
