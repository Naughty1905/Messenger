const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// DB conncetion
const DB = require('./src/DB/dbConnection');
DB()
  .then(() => console.log('DB connected'))
  .catch(() => console.error('Errors'));

// Routs dir
const usersRouter = require('./routes/users');
const chatsRouter = require('./routes/chats');

// Server
const app = express();

// Middlewares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routs
app.use('/users', usersRouter);
app.use('/chats', chatsRouter);

// Static assets for production

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(''))
}

app.listen(PORT, () => console.log(`Server has started on ${PORT}`));
