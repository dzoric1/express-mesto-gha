import express from 'express';
import {
  getUsers,
  getUser,
  updateUser,
} from '../controllers/users.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateUser);

export default userRouter;
