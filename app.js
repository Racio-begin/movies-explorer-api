/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { errors } = require('celebrate');

const cors = require('cors');

const errorHandler = require('./middlewares/errorHandler');

const routes = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://giga-movies.nomoreparties.co',
    'http://api.giga-movies.nomoreparties.co',
  ],
  credentials: true,
}));

// защитить приложение от веб-уязвимостей
app.use(helmet());

// подключаемся к базе данных
mongoose.connect(DB_URL);

// применить для всех роутов встроенный в express парсер (чтение тела запроса)
app.use(express.json());

// подключаем логгер запросов
app.use(requestLogger);

// подключаем роуты
app.use(routes);

// подключаем логгер ошибок
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на порту ${PORT}! :)`);
});
