const moviesRouter = require('express').Router();

const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../controllers/movies');

// возвращает все сохранённые текущим пользователем фильмы
moviesRouter.get('/movies', getMovies);

// создаёт фильм с переданными в теле
// country, director, duration, year, description,
// image, trailer, nameRU, nameEN и thumbnail, movieId
moviesRouter.post('/movies', createMovies);

// удаляет сохранённый фильм по id
moviesRouter.delete('/movies/_id', deleteMovies);

module.exports = moviesRouter;
