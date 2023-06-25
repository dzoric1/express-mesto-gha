import User from '../models/user.js';

const createUser = (req, res) => {
  const { name, avatar, email } = req.body;
  User.create({ name, avatar, email })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

export default createUser;
