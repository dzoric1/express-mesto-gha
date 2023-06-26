/* eslint-disable no-unused-expressions */
import User from '../models/user.js';

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') return res.status(400).send(error);
      res.status(500).send(error);
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((error) => {
      res.status(500).send(error);
    });
};

const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      user ? res.send(user) : res.status(404)
        .send({
          name: 'NotFound',
          message: 'User not found',
        });
    })
    .catch((error) => res.status(400).send(error));
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )
    .then((updatedUser) => res.send(updatedUser))
    .catch((error) => res.status(400).send(error));
};

export {
  createUser,
  getUsers,
  getUser,
  updateUser,
};
