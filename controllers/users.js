// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

});

module.exports = mongoose.model('user', userSchema);
