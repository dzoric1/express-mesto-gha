import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import userRouter from './routes/users.js';
import cardRouter from './routes/cards.js';
import {
  login,
  createUser,
} from './controllers/users.js';

const { PORT = 3000 } = process.env;

const app = express();
app.use(helmet());
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '64982ca762c09c7a3b42fbd4',
  };
  next();
});

app.post('/signin', login);
app.post('/signup', createUser);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', (req, res) => {
  res.status(404).send({
    name: 'NotFound',
    message: 'User not found',
  });
});

app.listen(PORT, () => { console.log(`server running on port:${PORT}`); });
