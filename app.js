require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var foodsRouter = require('./routes/api/v1/foods');
var mealsRouter = require('./routes/api/v1/meals');
var foodsSearchRouter = require('./routes/api/v1/recipes/foods_search');
var calorieCountRouter = require('./routes/api/v1/recipes/calorie_count')
var preparationTimeRouter = require('./routes/api/v1/recipes/preparation_time');
var calorieCountRouter = require('./routes/api/v1/recipes/calorie_count');
var numOfIngredientsRouter = require('./routes/api/v1/recipes/num_of_ingredients');
var averageCalorieCount = require('./routes/api/v1/recipes/average_calorie_count');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/foods', foodsRouter);
app.use('/api/v1/meals', mealsRouter);

app.use('/api/v1/recipes/foods_search', foodsSearchRouter);
app.use('/api/v1/recipes/calorie_count', calorieCountRouter);
app.use('/api/v1/recipes/num_of_ingredients', numOfIngredientsRouter);
app.use('/api/v1/recipes/average_calorie_count', averageCalorieCount);
app.use('/api/v1/recipes/preparation_time', preparationTimeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
