const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

// применить для всех роутов встроенный в express парсер (чтение тела запроса)
app.use(express.json());

// подключаемся к базе данных
mongoose.connect(DB_URL);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на порту ${PORT}! :)`);
});
