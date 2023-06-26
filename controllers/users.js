/* eslint-disable no-unused-expressions */
import User from '../models/user.js';

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((error) => {
      console.log(error);
      if (error.name === 'ValidationError') return res.status(400).send(error.message);
      res.status(500).send(error.message);
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((error) => {
      console.log(error);
      res.status(500).send(error.message);
    });
};

const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      user ? res.send(user) : res.status(404).send('User not found');
    })
    .catch((error) => res.status(400).send(error.message));
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    {
      new: true,
    },
  )
    .then((updatedUser) => res.send(updatedUser))
    .catch((error) => res.status(400).send(error.message));
};

export {
  createUser,
  getUsers,
  getUser,
  updateUser,
};
