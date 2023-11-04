//

const path = require('path');

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');

//

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './../public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = err;

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
