const moviesRouter = require('express').Router();

const {
  movieJoiValidation,
  movieIdJoiValidation,
} = require('../middlewares/JoiValidator');

const {
  getUserMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// возвращает все сохранённые текущим пользователем фильмы
moviesRouter.get('/', movieJoiValidation, getUserMovies);

// создаёт фильм с переданными в теле
// country, director, duration, year, description,
// image, trailer, nameRU, nameEN, thumbnail и movieId
moviesRouter.post('/', movieJoiValidation, createMovie);

// удаляет сохранённый фильм по id
moviesRouter.delete('/:movieId', movieIdJoiValidation, deleteMovie);

module.exports = moviesRouter;
