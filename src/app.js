//

const path = require('path');

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//

require('./models/models.js');

//

const indexRouter = require('./routes/index.js');
const usersRouter = require('./routes/users_router.js');
const adminRouter = require('./routes/admin_router.js');
const postsRouter = require('./routes/posts_router.js');
const categoriesRouter = require('./routes/categories_router.js');
const authRouter = require('./routes/auth_router.js');
const sessionsRouter = require('./routes/sessions_router.js');

//

const app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './../public')));

const { secret } = require('./../config/secret.json');

app.use(session({
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/posts', postsRouter);
app.use('/categories', categoriesRouter);
app.use('/auth/users', authRouter);
app.use('/sessions', sessionsRouter);

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
