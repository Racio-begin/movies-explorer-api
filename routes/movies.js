const moviesRouter = require('express').Router();

const {
  movieJoiValidation,
  movieIdJoiValidation,
} = require('../middlewares/JoiValidator');

const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// возвращает все сохранённые текущим пользователем фильмы
moviesRouter.get('/movies', movieJoiValidation, getAllMovies);

// создаёт фильм с переданными в теле
// country, director, duration, year, description,
// image, trailer, nameRU, nameEN и thumbnail, movieId
moviesRouter.post('/movies', movieJoiValidation, createMovie);

// удаляет сохранённый фильм по id
moviesRouter.delete('/movies/_id', movieIdJoiValidation, deleteMovie);

module.exports = moviesRouter;
