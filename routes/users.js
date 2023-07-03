import express from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  getCurrentUser,
} from '../controllers/users.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateUser);

export default userRouter;
