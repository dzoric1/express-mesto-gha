import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLenth: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
    minLenth: 2,
    maxLength: 30,
  },
});

const User = mongoose.model('user', userSchema);

export default User;
