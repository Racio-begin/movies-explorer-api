const usersRouter = require('express').Router();

const { updateUserInfoJoiValidation } = require('../middlewares/JoiValidator');

const {
  getUserInfo,
  updateUser,
} = require('../controllers/users');

usersRouter.get('/me', getUserInfo);
usersRouter.patch('/me', updateUserInfoJoiValidation, updateUser);

module.exports = usersRouter;
