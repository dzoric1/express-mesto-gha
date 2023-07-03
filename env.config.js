import dotenv from 'dotenv';

dotenv.config();

export const {
  PORT = 3000,
  JWT_SECRET_KEY = '55c174a9ef873cc486b909f7d5d7b3ed95e39814890f7d73442b47649fb18c49',
  REGEX_URL = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-._~:/?#\[\]@!\$&'()*+,;=]+#?$/,
} = process.env;
