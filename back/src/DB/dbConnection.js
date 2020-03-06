const mongoose = require('mongoose');

const DBconnection = () => {
  const connectionUrl = `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@cluster0-rskpa.mongodb.net/test?retryWrites=true&w=majority`;
  return mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

}

module.exports = DBconnection;


