const mongoose = require('mongoose');

const DBconnection = () => {
  return mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
}

module.exports = DBconnection;


