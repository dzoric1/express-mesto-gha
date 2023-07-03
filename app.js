import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import auth from './middlewares/auth.js';
import userRouter from './routes/users.js';
import cardRouter from './routes/cards.js';
import { PORT } from './env.config.js';
import {
  login,
  createUser,
} from './controllers/users.js';

const app = express();
app.use(helmet());
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', login);
app.post('/signup', createUser);
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
app.use('*', (req, res) => {
  res.status(404).send({
    name: 'NotFound',
    message: 'User not found',
  });
});

app.listen(PORT, () => { console.log(`server running on port:${PORT}`); });
