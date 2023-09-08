const Movie = require('../models/movie');

const {
  OK_STATUS,
  CREATED_STATUS,
} = require('../utils/ServerResponseStatuses');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getUserMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    moviedId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    moviedId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(CREATED_STATUS).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при добавлении карточки.'));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  Movie.findById(movieId)
    // eslint-disable-next-line consistent-return
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Фильм с указанным id не найден'));
      }
      if (movie.owner.toString() !== userId) {
        return next(new ForbiddenError('Невозможно удаленить чужой фильм.'));
      }
      Movie.deleteOne(movie)
        .then(() => res.status(OK_STATUS).send(movie))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные при удалении фильма.'));
      }
      return next(err);
    });
};

module.exports = {
  createMovie,
  getUserMovies,
  deleteMovie,
};
