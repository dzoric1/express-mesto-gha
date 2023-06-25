import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLenth: 2,
    maxLength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Card = mongoose.model('card', cardSchema);

export default Card;
