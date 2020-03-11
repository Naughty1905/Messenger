const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// DB conncetion
const DB = require('../DB/dbConnection');
DB()
  .then(() => console.log('DB connected'))
  .catch(() => console.error('Errors'));

// Routs dir
const usersRouter = require('./routes/users');
const chatsRouter = require('./routes/chats');

// Server
const app = express();

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Routs
app.use('/users', usersRouter);
app.use('/chats', chatsRouter);

app.listen(PORT, () => console.log(`Server has started on ${PORT}`));
