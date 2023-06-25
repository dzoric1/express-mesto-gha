import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRouter from './routes/users.js';

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '64982ca762c09c7a3b42fbd4',
  };
  next();
});

app.use('/users', userRouter);

app.listen(PORT, () => { console.log('Server'); });
