require('dotenv').config();

const {
  PORT,
  DB_URL,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

const config = {
  PORT: NODE_ENV === 'production' ? PORT : 3000,
  DB_URL: NODE_ENV === 'production' ? DB_URL : 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'four-seven-two-thousand-twenty-three-secret',
};

module.exports = config;
