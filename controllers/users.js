// Подключим модуль для хэширования пароля
const bcrypt = require('bcryptjs');

// Подключим модуль для создания и проверки токенов
const jwt = require('jsonwebtoken');

// Импортировать модель пользователя
const User = require('../models/user');

const config = require('../utils/config');

// Импортировать статусы ответов сервера
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');

const { OK_STATUS, CREATED_STATUS, MONGO_DUPLICATE_KEY_ERROR } = require('../utils/ServerResponseStatuses');

const SALT_ROUNDS = 10;

//  РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ  //
const createUser = (req, res, next) => {
  // Получим из объекта запроса имя, описание и аватар пользователя
  const {
    name,
    email,
    password,
  } = req.body;

  // Вызвать метод create, передаем данные на вход для создания пользователя,
  // создадим документ на основе пришедших данных
  bcrypt.hash(
    password,
    SALT_ROUNDS,
  )
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    // в случае успеха (resolve) приходит новая запись с новым пользователем, отправляем её на фронт
    .then((user) => {
      res.status(CREATED_STATUS).send(user);
    })
    // в случае провала (req) приходит ошибка и отпраляется на фронт для обозначения проблемы
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      }
      if (err.code === MONGO_DUPLICATE_KEY_ERROR) {
        return next(new ConflictError('Пользователь с указанным Email уже зарегистрирован.'));
      }
      return next(err);
    });
};

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Такого пользователя не существует.'));
      }
      res.status(OK_STATUS).send(user);
      // eslint-disable-next-line no-console
      console.log(user, 'Пользователь успешно запрошен.');
    })
    .catch(next);
};

// ОБНОВЛЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ //
const updateUser = (req, res, next) => {
  // Вызвать метод findByIdAndUpdate, ищет пользователя по id и обновляет указанные поля
  const { name, email } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, email }, {
    // обработчик then получит на вход обновлённую запись
    new: true,
    // данные будут валидированы перед изменением
    runValidators: true,
  })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
      }
      return next(err);
    });
};

// АВТОРИЗАЦИЯ ПОЛЬЗОВАТЕЛЯ //
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        config.JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token, user });
    })
    .catch(next);
};

// РАЗЛОГИРОВАНИЕ ПОЛЬЗОВАТЕЛЯ //
const logout = (req, res) => {
  req.session.destroy(() => {
    res.send({ message: 'Выход пользователя.' });
  });
};

module.exports = {
  createUser,
  getUserInfo,
  updateUser,
  login,
  logout,
};
