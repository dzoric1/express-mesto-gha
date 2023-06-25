import User from '../models/user.js';

const createUser = (req, res) => {
  console.log('start');
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((error) => res.status(500).send(error));
};

const getUsers = (req, res) => {
  console.log('start');
  User.find({})
    .then((users) => res.send(users))
    .catch((error) => res.status(404).send(error));
};

const getUser = (req, res) => {
  console.log('start');
  const { id } = req.params;
  User.findById(id)
    .then((user) => res.send(user))
    .catch((error) => res.status(404).send(error));
};

const updateUser = (req, res) => {
  console.log('start');
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    {
      new: true,
    },
  )
    .then((updatedUser) => res.send(updatedUser))
    .catch((error) => res.status(500).send(error));
};

export {
  createUser,
  getUsers,
  getUser,
  updateUser,
};
