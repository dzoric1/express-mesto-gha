import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minLength: [2, 'Минимальная длина поля "name" - 2'],
    maxLength: [30, 'Максимальная длина поля "name" - 30'],
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  about: {
    type: String,
    default: 'Исследователь',
    minLength: [2, 'Минимальная длина поля "about" - 2'],
    maxLength: [30, 'Максимальная длина поля "about" - 30'],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный Email',
    },
  },
  password: {
    type: String,
    required: true,
    minLength: [6, 'Минимальная длина поля "password" - 6'],
  },
}, { versionKey: false });

const User = mongoose.model('user', userSchema);

export default User;
