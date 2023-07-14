import jwt from 'jsonwebtoken';
import UnauthorizedError from '../utils/errors/UnauthorizedError.js';
import { JWT_SECRET_KEY } from '../env.config.js';

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(authorization, JWT_SECRET_KEY);
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;
  next();
};

export default auth;
