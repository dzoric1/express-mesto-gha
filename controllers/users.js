/* eslint-disable no-unused-expressions */
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(({ name, about, avatar }) => res.status(201).send({ name, about, avatar }))
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
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send(error);
      } else {
        res.status(500).send(error);
      }
    });
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
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send(error);
      } else {
        res.status(500).send(error);
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password);
    })
    .catch((error) => {
      res.status(401).send({ message: error.message });
    });
};

export {
  createUser,
  getUsers,
  getUser,
  updateUser,
  login,
};
