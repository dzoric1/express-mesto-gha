/* eslint-disable no-unused-expressions */
import Card from '../models/card.js';
import BadRequestError from '../utils/errors/BadRequestError.js';
import NotFoundError from '../utils/errors/NotFoundError.js';
import ForbiddenError from '../utils/errors/ForbiddenError.js';

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((error) => next(error));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(error.message));
      } else {
        next(error);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      if (!card) {
        return new NotFoundError('Карточка не найдена');
      }

      if (card.owner.toString() !== req.params.cardId) {
        return new ForbiddenError('Удалять можно только свои карточки!');
      }

      Card.deleteOne(card)
        .then(() => {
          res.send({ message: 'Карточка удалена' });
        })
        .catch((error) => {
          if (error.name === 'CastError') {
            next(new BadRequestError('Переданные данные не валидны'));
          } else {
            next(error);
          }
        });
    });
};

const handleCardLike = (req, res, next, isLike) => {
  const { cardId } = req.params;
  const action = isLike ? '$addToSet' : '$pull';
  Card.findByIdAndUpdate(cardId, { [action]: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Переданные данные не валидны'));
      } else {
        next(error);
      }
    });
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
