/* eslint-disable no-unused-expressions */
import Card from '../models/card.js';

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((error) => res.status(500).send(error));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((error) => res.status(400).send(error));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch((error) => res.status(500).send(error));
};

const handleCardLike = (req, res, isLike) => {
  const { cardId } = req.params;
  const action = isLike ? '$addToSet' : '$pull';
  Card.findByIdAndUpdate(cardId, { [action]: { likes: req.user._id } }, { new: true })
    .then((card) => {
      card ? res.send(card) : res.status(404)
        .send({
          name: 'NotFound',
          message: 'Card not found',
        });
    })
    .catch((error) => res.status(400).send(error));
};

const likeCard = (req, res) => {
  handleCardLike(req, res, { isLike: true });
};

const dislikeCard = (req, res) => {
  handleCardLike(req, res, { isLike: false });
};

export {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
