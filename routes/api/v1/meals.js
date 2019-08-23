var express = require('express');

var Meal = require('../../../models').Meal;
var MealFood = require('../../../models').MealFood;

var router = express.Router();

router.get('/', (request, response) => {
  return Meal.findAll({
    include: 'foods'
  })
  .then(meals => {
    response.setHeader('Content-Type', 'application/json');
    response.status(200).send(JSON.stringify(meals, ['id', 'name', 'foods', 'id', 'name', 'calories']));
  })
  .catch(error => {
    response.setHeader('Content-Type', 'application/json');
    response.status(500).send({ error });
  })
})

router.delete('/:id/foods/:food_id', (request, response) => {
  return MealFood.findOne({
    where: {
      foodId: request.params.food_id,
      mealId: request.params.id
    }
  })
  .then(mealFood => {
    if (mealFood) {
      return mealFood.destroy()
      .then(destroyedMealFood => {
        response.setHeader('Content-Type', 'application/json');
        response.status(204).send(JSON.stringify(destroyedMealFood));
      })
    } else {
      response.setHeader('Content-Type', 'application/json');
      response.status(404).send({ error: 'Not Found.' });
    }
  })
  .catch(error => {
    console.log(error)
    response.setHeader('Content-Type', 'application/json');
    response.status(500).send({ error });
  })
})

module.exports = router;
