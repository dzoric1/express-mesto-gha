import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minLength: [2, 'Минимальная длина поля "name" - 2'],
    maxLength: [30, 'Максимальная длина поля "name" - 30'],
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
    required: [true, 'Поле "avatar" должно быть заполнено'],
  },
  about: {
    type: String,
    required: [true, 'Поле "about" должно быть заполнено'],
    minLength: [2, 'Минимальная длина поля "about" - 2'],
    maxLength: [30, 'Максимальная длина поля "about" - 30'],
  },
}, { versionKey: false });

const User = mongoose.model('user', userSchema);

export default User;
