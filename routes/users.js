const usersRouter = require('express').Router();

const { updateUserInfoJoiValidation } = require('../middlewares/JoiValidator');

const {
  getUserInfo,
  updateUser,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
usersRouter.get('/me', getUserInfo);

// обновляет информацию о пользователе (email и имя)
usersRouter.patch('/me', updateUserInfoJoiValidation, updateUser);

module.exports = usersRouter;
