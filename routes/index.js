const router = require('express').Router();

const auth = require('../middlewares/auth');
const { createUserJoiValidation, loginJoiValidation } = require('../middlewares/JoiValidator');

const { login, createUser, logout } = require('../controllers/users');

const usersRouter = require('./users');
const moviesRouter = require('./movies');

const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', loginJoiValidation, login);
router.post('/signup', createUserJoiValidation, createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.post('/signout', logout);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Ресурс не найден. Проверьте правильность введенного URL.'));
});

module.exports = router;
