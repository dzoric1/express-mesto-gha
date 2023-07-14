import express from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  getCurrentUser,
} from '../controllers/users.js';
import {
  validateUserId,
  validateUser,
} from '../utils/validators/userValidator.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:id', validateUserId, getUser);
userRouter.patch('/me', validateUser, updateUser);
userRouter.patch('/me/avatar', validateUser, updateUser);

export default userRouter;
