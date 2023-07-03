/* eslint-disable no-unused-expressions */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../env.config.js';
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
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((error) => {
      res.status(401).send({ message: error.message });
    });
};

const getCurrentUser = (req, res) => {
  User.findOne({ _id: req.user._id })
    .then((user) => res.send(user))
    .catch((error) => res.status(401).send({ message: error.message }));
};

export {
  createUser,
  getUsers,
  getUser,
  updateUser,
  login,
  getCurrentUser,
};
